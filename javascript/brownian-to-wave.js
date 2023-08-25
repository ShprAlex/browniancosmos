class Simulation {
    constructor(max_population, histogram_size) {
        this.MAX_POPULATION = max_population;
        this.HISTOGRAM_SIZE = histogram_size;
        this.initializePopulation();
        this.brighness = Math.sqrt(this.MAX_POPULATION) / Math.sqrt(this.HISTOGRAM_SIZE);
    }

    modh(v) {
        return v >= 0 ? v % this.HISTOGRAM_SIZE : v % this.HISTOGRAM_SIZE + this.HISTOGRAM_SIZE;
    }

    initializePopulation() {
        this.histogram = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.MAX_POPULATION; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
    }

    updatePopulation() {
        let hist2 = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            for (let j = 0; j < this.histogram[i]; j++) {
                let r = Math.floor(Math.random() * 3) - 1;
                hist2[this.modh(i + r)]++;
            }
        }
        this.histogram = hist2;
    }

    increasePopulation(targetPopulation) {
        for (let i = this.MAX_POPULATION; i < targetPopulation; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
        this.MAX_POPULATION = Math.max(this.MAX_POPULATION, targetPopulation);
        this.brighness = Math.sqrt(this.MAX_POPULATION) / Math.sqrt(this.HISTOGRAM_SIZE);
    }

    normalizeBrightness(value, n) {
        let v = Math.min(1, Math.max(0, value / Math.sqrt(n) / this.brighness / 2.3));
        if (isNaN(v)) {
            return 0;
        }
        return v;
    }

    /**
     * Scans over the histogram and for every index subtracts the of the next n numbers from the
     * previous n numbers. This linear sum is a bit like a 'square' wave that has sharp boundary
     * conditions sensitive to noise.
     */
    toWaveSquare(n) {
        let column = new Array(this.histogram.length).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;
        let running_sum = 0;
        for (let j = 0; j < r; j++) {
            running_sum += this.histogram[this.modh(j)];
        }
        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            column[i] -= running_sum;
            column[(i + r) % this.HISTOGRAM_SIZE] += running_sum;
            running_sum -= this.histogram[i];
            running_sum += this.histogram[this.modh(i + r)];
            // Less efficient version of this for loop:
            //
            // for (let j = -r; j < r; j++) {
            //   let v = this.histogram[this.modh(i + j)];
            //   if (j < 0) {
            //     column[i] += v;
            //   } else {
            //     column[i] -= v;
            //   }
            // }
        }
        if (fraction > 0) {
            for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
                column[i] += this.histogram[this.modh(i - r - 1)] * fraction;
                column[i] -= this.histogram[this.modh(i + r)] * fraction;
            }
        }
        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            column[i] = this.normalizeBrightness(column[i], n);
        }

        return column;
    }

    /**
     * Scans over the histogram and for every index subtracts a weighted sum the of the next n
     * numbers from the previous n numbers. The weights are in the form of a triangle where the
     * greatest weight is given to the middle of the n numbers, forming a kind of "triangle"
     * wave. This has the benefit of being less affected by noise at the edges where the weights
     * are low.
     */
    toWaveTriangle(n) {
        let column = new Array(this.HISTOGRAM_SIZE).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;

        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            for (let j = -r; j < 0; j++) {
                let v = this.histogram[this.modh(i + j)];
                let k = n + j;
                column[i] += v * (n - Math.abs(n - 1 - k * 2)) / n;
            }

            for (let j = 0; j < r; j++) {
                let v = this.histogram[this.modh(i + j)];
                let k = j;
                column[i] -= v * (n - Math.abs(n - 1 - k * 2)) / n;
            }

            if (fraction) {
                column[i] += this.histogram[this.modh(i - r - 1)] * fraction / n;
                column[i] -= this.histogram[this.modh(i + r)] * fraction / n;
            }

            column[i] = this.normalizeBrightness(column[i] * 2, n);
        }
        return column;
    }

    /**
     * Scans over the histogram and for every index computes a weighted sum by sin(x/PI) for x in
     * range of -n to n. This has the same effect as a triangle wave where the goal is to give
     * greater weight to the middle of the intervals ahead and behind and lower weights to their
     * ends to reduce noise.
     */
    toWaveSine(n) {
        let column = new Array(this.HISTOGRAM_SIZE).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;

        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            for (let j = -r - 1; j < r + 1; j++) {
                let v = this.histogram[this.modh(i + j)];
                v = v * Math.sin((n + j + 0.5) / n * Math.PI);
                if (j > -r - 1 && j < r) {
                    column[i] += v;
                }
                else {
                    if (v * (r + j) < 0) {
                        column[i] += v * fraction;
                    }
                }
            }
            column[i] = this.normalizeBrightness(column[i] * 2, n);
        }
        return column;
    }

    toWave(n, waveShape = 'square') {
        if (waveShape === 'square') {
            return this.toWaveSquare(n);
        }
        else if (waveShape === 'triangle') {
            return this.toWaveTriangle(n);
        }
        else if (waveShape === 'sine') {
            return this.toWaveSine(n);
        }
        return null;
    }

    step(generations = 1) {
        for (let i = 0; i < generations; i++) {
            this.updatePopulation();
        }
    }
}
