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
      let v = Math.min(1, Math.max(0, value / Math.sqrt(n) / this.brighness / 2.2));
      if (isNaN(v)) {
        return 0;
      }
      return v;
    }
  
    toWaveRough(n) {
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
  
    toWaveSmooth(n) {
      let column = new Array(this.HISTOGRAM_SIZE).fill(0);
      let r = Math.floor(n);
  
      for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
        let quarter = 0; // r // 4
        for (let j = -r + quarter; j < 0 + quarter; j++) {
          let v = this.histogram[(i + j + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE];
          let k = r + j - quarter;
          column[i] += v * (r - Math.abs(r - 1 - k * 2)) / r;
        }
  
        for (let j = 0 - quarter; j < r - quarter; j++) {
          let v = this.histogram[(i + j + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE];
          let k = j + quarter;
          column[i] -= v * (r - Math.abs(r - 1 - k * 2)) / r;
        }
  
        column[i] = this.normalizeBrightness(column[i], n);
      }
  
      return column;
    }
  
    toWave(n, smooth = false) {
      if (smooth) {
        return this.toWaveSmooth(n);
      }
      return this.toWaveRough(n);
    }
  
    step(generations = 1) {
      for (let i = 0; i < generations; i++) {
        this.updatePopulation();
      }
    }
  }


//   histogram_size = 400;
//   max_population = 400;
//   step_size = 5;
//   console.log("start");
//   simulation = new Simulation(max_population=max_population, histogram_size=histogram_size);
//   for (let i=0;i<100;i++) {
//     simulation.step();
//   }
//   console.log(simulation.toWave(5));