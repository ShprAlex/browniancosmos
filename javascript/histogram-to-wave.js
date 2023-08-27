class HistogramToWave {

    static normalizeBrightness(histogramSize, populationSize, spanSize, spanValue) {
        if (spanValue === 0 || populationSize === 0) {
            return 0;
        }
        return Math.max(0, spanValue * Math.sqrt(histogramSize / spanSize / populationSize) / 2.3);
    }

    /**
     * Scans over the histogram and for every index subtracts the sum of the next n numbers from
     * the previous n numbers. This simple sum is a bit like a 'square' wave that has sharp
     * boundary conditions sensitive to noise.
     */
    static toWaveSquare(histogram, populationSize, n) {
        let HISTOGRAM_SIZE = histogram.length;
        let column = new Array(HISTOGRAM_SIZE).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;
        let running_sum = 0;

        const modh = (v) => (v >= 0 ? v % HISTOGRAM_SIZE : v % HISTOGRAM_SIZE + HISTOGRAM_SIZE);

        for (let j = 0; j < r; j++) {
            running_sum += histogram[modh(j)];
        }

        for (let i = 0; i < HISTOGRAM_SIZE; i++) {
            column[i] -= running_sum;
            column[modh(i + r)] += running_sum;
            running_sum -= histogram[i];
            running_sum += histogram[modh(i + r)];
        }

        if (fraction > 0) {
            for (let i = 0; i < HISTOGRAM_SIZE; i++) {
                column[i] += histogram[modh(i - r - 1)] * fraction;
                column[i] -= histogram[modh(i + r)] * fraction;
            }
        }

        for (let i = 0; i < HISTOGRAM_SIZE; i++) {
            column[i] = HistogramToWave.normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i]);
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
    static toWaveTriangle(histogram, populationSize, n) {
        let HISTOGRAM_SIZE = histogram.length;
        let column = new Array(HISTOGRAM_SIZE).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;

        const modh = (v) => (v >= 0 ? v % HISTOGRAM_SIZE : v % HISTOGRAM_SIZE + HISTOGRAM_SIZE);
        
        for (let i = 0; i < HISTOGRAM_SIZE; i++) {
            for (let j = -r; j < 0; j++) {
                let v = histogram[modh(i + j)];
                let k = n + j;
                column[i] += v * (n - Math.abs(n - 1 - k * 2)) / n;
            }

            for (let j = 0; j < r; j++) {
                let v = histogram[modh(i + j)];
                let k = j;
                column[i] -= v * (n - Math.abs(n - 1 - k * 2)) / n;
            }

            if (fraction) {
                column[i] += histogram[modh(i - r - 1)] * fraction / n;
                column[i] -= histogram[modh(i + r)] * fraction / n;
            }
            
            column[i] = HistogramToWave.normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i] * 2);
        }
        
        return column;
    }

    /**
     * Scans over the histogram and for every index computes a weighted sum by sin(x/PI) for x in
     * range of -n to n. This has the same effect as a triangle wave where the goal is to give
     * greater weight to the middle of the intervals ahead and behind and lower weights to their
     * ends to reduce noise.
     */
    static toWaveSine(histogram, populationSize, n) {
        let HISTOGRAM_SIZE = histogram.length;
        let column = new Array(HISTOGRAM_SIZE).fill(0);
        let r = Math.floor(n);
        let fraction = n - r;

        const modh = (v) => (v >= 0 ? v % HISTOGRAM_SIZE : v % HISTOGRAM_SIZE + HISTOGRAM_SIZE);

        for (let i = 0; i < HISTOGRAM_SIZE; i++) {
            for (let j = -r - 1; j < r + 1; j++) {
                let v = histogram[modh(i + j)];
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

            column[i] = HistogramToWave.normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i] * 2);
        }
        return column;
    }

    /**
     * Returns the original histogram adjusted for brightness.
     */
    static toWaveNone(histogram, populationSize) {
        let HISTOGRAM_SIZE = histogram.length;
        const brightness = HISTOGRAM_SIZE / populationSize / 2;
        return histogram.map((v) => Math.min(v * brightness, 1));
    }

    static toWave(histogram, populationSize, n, waveShape = 'square') {
        if (waveShape === 'square') {
            return HistogramToWave.toWaveSquare(histogram, populationSize, n);
        }
        else if (waveShape === 'triangle') {
            return HistogramToWave.toWaveTriangle(histogram, populationSize, n);
        }
        else if (waveShape === 'sine') {
            return HistogramToWave.toWaveSine(histogram, populationSize, n);
        }
        return HistogramToWave.toWaveNone(histogram, populationSize);
    }
}
