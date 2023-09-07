"use strict";

/**
 * This is a simple implementation of a Browninan motion simulator which uses a histogram
 * as the model to keep track of particle positions.
 */
class BrownianSimulation {
    constructor(populationSize, histogramSize) {
        this.POPULATION_SIZE = populationSize;
        this.HISTOGRAM_SIZE = histogramSize;
        this.initializePopulation();
    }

    modh(v) {
        return (v % this.HISTOGRAM_SIZE + this.HISTOGRAM_SIZE) % this.HISTOGRAM_SIZE;
    }

    initializePopulation() {
        this.histogram = new Array(this.HISTOGRAM_SIZE).fill(0);
        for (let i = 0; i < this.POPULATION_SIZE; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
    }

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

    increasePopulation(targetPopulation) {
        if (targetPopulation <= this.POPULATION_SIZE) {
            return;
        }
        for (let i = this.POPULATION_SIZE; i < targetPopulation; i++) {
            this.histogram[Math.floor(Math.random() * this.HISTOGRAM_SIZE)]++;
        }
        this.POPULATION_SIZE = targetPopulation;
    }

    getHistogram() {
        return this.histogram;
    }

    step(iterations = 1) {
        for (let i = 0; i < iterations; i++) {
            this.updatePositions();
        }
    }
}
