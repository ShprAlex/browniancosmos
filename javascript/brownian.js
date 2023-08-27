class Simulation {
    constructor(POPULATION_SIZE, histogram_size) {
        this.POPULATION_SIZE = POPULATION_SIZE;
        this.HISTOGRAM_SIZE = histogram_size;
        this.initializePopulation();
    }

    modh(v) {
        return v >= 0 ? v % this.HISTOGRAM_SIZE : v % this.HISTOGRAM_SIZE + this.HISTOGRAM_SIZE;
    }

    initializePopulation() {
        this.histogram = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.POPULATION_SIZE; i++) {
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
        for (let i = this.POPULATION_SIZE; i < targetPopulation; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
        this.POPULATION_SIZE = Math.max(this.POPULATION_SIZE, targetPopulation);
    }

    step(generations = 1) {
        for (let i = 0; i < generations; i++) {
            this.updatePopulation();
        }
    }
}
