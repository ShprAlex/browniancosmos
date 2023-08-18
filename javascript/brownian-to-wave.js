class Simulation {
    constructor(max_population, histogram_size) {
      this.MAX_POPULATION = max_population;
      this.HISTOGRAM_SIZE = histogram_size;
      this.initializePopulation();
      this.brighness = Math.sqrt(this.MAX_POPULATION) / Math.sqrt(this.HISTOGRAM_SIZE);
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
          hist2[(i + r + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE]++;
        }
      }
      this.histogram = hist2;
    }

    increasePopulation(targetPopulation) {
        for (let i=this.MAX_POPULATION;i<targetPopulation;i++) {
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
     * previous n numbers. This linear sum is a bit like a "square" wave that has sharp boundary
     * conditions sensitive to noise.
     */
    toWaveSquare(n) {
      let column = new Array(this.histogram.length).fill(0);
      let r = Math.floor(n);
      let fraction = n - r;
      let running_sum = 0;
      for (let j = 0; j < r; j++) {
        running_sum+=this.histogram[j % this.HISTOGRAM_SIZE];
      }
      for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
        column[i] -= running_sum;
        column[(i+r)%this.HISTOGRAM_SIZE] += running_sum;
        running_sum -= this.histogram[i];
        running_sum += this.histogram[(i+r)%this.HISTOGRAM_SIZE];
        // Less efficient version of this for loop:
        //
        // for (let j = -r; j < r; j++) {
        //   let v = this.histogram[(i + j + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE];
        //   if (j < 0) {
        //     column[i] += v;
        //   } else {
        //     column[i] -= v;
        //   }
        // }
      }
      if (fraction > 0) {
        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
          column[i] += this.histogram[(i - r - 1 + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE] * fraction;
          column[i] -= this.histogram[(i + r + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE] * fraction;
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
     * greatest weight is given to the middle of the n numbers, forming a kind of "tiangular"
     * wave. This has the benefit of being less affected by noise at the edges where the weights
     * are low.
     */
    toWaveTriangular(n) {
      let column = new Array(this.HISTOGRAM_SIZE).fill(0);
      let r = Math.floor(n);
  
      for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
        for (let j = -r; j < 0; j++) {
          let v = this.histogram[(i + j + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE];
          let k = r + j;
          column[i] += v * (r - Math.abs(r - 1 - k * 2)) / r;
        }
  
        for (let j = 0; j < r; j++) {
          let v = this.histogram[(i + j + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE];
          let k = j;
          column[i] -= v * (r - Math.abs(r - 1 - k * 2)) / r;
        }
  
        column[i] = this.normalizeBrightness(column[i]*2, n);
      }
      return column;
    }
  
    toWave(n, waveShape = "square") {
      if (waveShape === "square") {
        return this.toWaveSquare(n);
      }
      else if (waveShape === "triangular") {
        return this.toWaveTriangular(n);
      }
      return null;
    }
  
    step(generations = 1) {
      for (let i = 0; i < generations; i++) {
        this.updatePopulation();
      }
    }
  }
