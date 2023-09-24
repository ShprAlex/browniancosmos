/**
 * This is a simple implementation of a Browninan motion simulator which uses a histogram
 * as the model to keep track of particle positions.
 */
class BrownianSimulation {
    /**
     * Constructor for the BrownianSimulation class.
     * @param {number} populationSize - Initial number of particles.
     * @param {number} histogramSize - Size of the histogram used to track particle positions.
     */
    constructor(populationSize, histogramSize) {
        this.POPULATION_SIZE = populationSize;
        this.HISTOGRAM_SIZE = histogramSize;
        this.initializePopulation();
    }

    /**
     * Modulo operation that always returns positive remainder.
     * @param {number} v - Value to take the modulo of.
     * @returns {number} - The positive remainder.
     */
    modh(v) {
        return (v % this.HISTOGRAM_SIZE + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE;
    }

    /**
     * Initializes the population histogram with random particle positions.
     */
    initializePopulation() {
        this.histogram = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.POPULATION_SIZE; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
    }

    /**
     * Given a historgam move every point in every bar up, down, or keep it alone
     * with equal probability.
     */
    updatePositions() {
        const updatedHist = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.HISTOGRAM_SIZE; i++) {
            for (let j = 0; j < this.histogram[i]; j++) {
                const r = Math.floor(Math.random() * 3) - 1;
                updatedHist[this.modh(i + r)]++;
            }
        }
        this.histogram = updatedHist;
    }

    /**
     * Increases the population of particles to the target population size.
     * @param {number} targetPopulation - The desired population size.
     */
    increasePopulation(targetPopulation) {
        if (targetPopulation <= this.POPULATION_SIZE) {
            return;
        }
        for (let i = this.POPULATION_SIZE; i < targetPopulation; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
        this.POPULATION_SIZE = targetPopulation;
    }

    /**
     * Returns the current state of the histogram.
     * @returns {Array} - The histogram.
     */
    getHistogram() {
        return this.histogram;
    }

    /**
     * Simulates particle movement for a given number of iterations.
     * @param {number} [iterations=1] - Number of iterations to simulate.
     */
    step(iterations = 1) {
        for (let i = 0; i < iterations; i++) {
            this.updatePositions();
        }
    }
}

export default BrownianSimulation;