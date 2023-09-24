/**
 * Convert a histogram to a "wave" by moving a sliding window over the histogram, taking the
 * difference between the first and second half of the window, and smoothing the results
 * depending on the waveform.
 */

/**
 * As a last step in converting a histogram to a "wave" array, we want to normalize the values at
 * each position to the range of 0-1 so they can later be displayed as a color brigness.
 *
 * @param {number} histogramSize - Size of the histogram.
 * @param {number} populationSize - Total number of particles.
 * @param {number} spanSize - The size of the sliding window.
 * @param {number} spanValue - For a square wave, this is the difference in the number of points
 *     between the first half and second half of the wave.
 * @returns {number} - Normalized brightness.
 */
function normalizeBrightness(histogramSize, populationSize, spanSize, spanValue) {
    if (spanValue === 0 || populationSize === 0) {
        return 0;
    }
    let b = Math.max(0, spanValue * Math.sqrt(histogramSize / spanSize / populationSize) / 2.3);
    // Scale down the brigest values to below 1, while keeping most of the colors saturated.
    if (b > 0.85) {
        b = (b - 0.85) / 5 + 0.85;
    }
    return Math.min(1, b);
}

/**
 * Scans over the histogram and for every index subtracts the sum of the next n numbers from
 * the previous n numbers. This simple sum is a bit like a 'square' wave that has sharp
 * boundary conditions sensitive to noise.
 *
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @param {number} n - The size of the wave as a decimal.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWaveSquare(histogram, populationSize, n) {
    let HISTOGRAM_SIZE = histogram.length;
    let column = new Array(HISTOGRAM_SIZE).fill(0);
    let r = Math.floor(n);
    let fraction = n - r;
    let runningSum = 0;

    const modh = (v) => (v % HISTOGRAM_SIZE + HISTOGRAM_SIZE) % HISTOGRAM_SIZE;

    for (let j = 0; j < r; j++) {
        runningSum += histogram[modh(j)];
    }

    for (let i = 0; i < HISTOGRAM_SIZE; i++) {
        column[i] -= runningSum;
        column[modh(i + r)] += runningSum;
        runningSum -= histogram[i];
        runningSum += histogram[modh(i + r)];
    }

    if (fraction > 0) {
        for (let i = 0; i < HISTOGRAM_SIZE; i++) {
            column[i] += histogram[modh(i - r - 1)] * fraction;
            column[i] -= histogram[modh(i + r)] * fraction;
        }
    }

    for (let i = 0; i < HISTOGRAM_SIZE; i++) {
        column[i] = normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i]);
    }

    return column;
}

/**
 * Scans over the histogram and for every index subtracts a weighted sum the of the next n
 * numbers from the previous n numbers. The weights are in the form of a triangle where the
 * greatest weight is given to the middle of the n numbers, forming a kind of "triangle"
 * wave. This has the benefit of being less affected by noise at the edges where the weights
 * are low.
 *
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @param {number} n - The size of the wave as a decimal.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWaveTriangle(histogram, populationSize, n) {
    let HISTOGRAM_SIZE = histogram.length;
    let column = new Array(HISTOGRAM_SIZE).fill(0);
    let r = Math.floor(n);
    let fraction = n - r;

    const modh = (v) => (v % HISTOGRAM_SIZE + HISTOGRAM_SIZE) % HISTOGRAM_SIZE;

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

        column[i] = normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i] * 2);
    }

    return column;
}

/**
 * Scans over the histogram and for every index computes a weighted sum by sin(x/PI) for x in
 * range of -n to n. This has the same effect as a triangle wave where the goal is to give
 * greater weight to the middle of the intervals ahead and behind and lower weights to their
 * ends to reduce noise.
 *
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @param {number} n - The size of the wave as a decimal.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWaveSine(histogram, populationSize, n) {
    let HISTOGRAM_SIZE = histogram.length;
    let column = new Array(HISTOGRAM_SIZE).fill(0);
    let r = Math.floor(n);
    let fraction = n - r;

    const modh = (v) => (v % HISTOGRAM_SIZE + HISTOGRAM_SIZE) % HISTOGRAM_SIZE;

    for (let i = 0; i < HISTOGRAM_SIZE; i++) {
        for (let j = -r - 1; j < r + 1; j++) {
            let v = histogram[modh(i + j)];
            // We're taking the difference between particles above and particles below, so we
            // need to center our sin wave between rows, hence adding the 0.5.
            v *= Math.sin((j + 0.5) / n * Math.PI);
            if (j > -r - 1 && j < r) {
                column[i] -= v;
            }
            else {
                if (v * (r + j) > 0) {
                    column[i] -= v * fraction;
                }
            }
        }

        column[i] = normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i] * 2);
    }
    return column;
}

/**
 * This produces surprisingly good results. We're doing a symmetrical comparison using a Cos
 * curve subtracting the particles in the middle from the particles at the ends.
 *
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @param {number} n - The size of the wave as a decimal.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWaveCosine(histogram, populationSize, n) {
    let HISTOGRAM_SIZE = histogram.length;
    let column = new Array(HISTOGRAM_SIZE).fill(0);
    n = n + 0.5;
    let r = Math.floor(n);
    const modh = (v) => (v % HISTOGRAM_SIZE + HISTOGRAM_SIZE) % HISTOGRAM_SIZE;

    for (let i = 0; i < HISTOGRAM_SIZE; i++) {
        for (let j = -r; j < r + 1; j++) {
            let v = histogram[modh(i + j)];
            // First we take 3 short half waves - 'down', 'up', 'down'
            v *= Math.cos(j / n * 1.5 * Math.PI);
            // Then we use another long half wave to weigh the results giving the 2 'downs'
            // the same weight as the single 'up'.
            v *= Math.cos(j / n * 0.5 * Math.PI);
            column[i] += v;
        }
        column[i] = normalizeBrightness(HISTOGRAM_SIZE, populationSize, n, column[i] * 2);
    }
    return column;
}

/**
 * Returns the original histogram adjusted for brightness.
 *
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWaveNone(histogram, populationSize) {
    let HISTOGRAM_SIZE = histogram.length;
    const brightness = HISTOGRAM_SIZE / populationSize / 2;
    return histogram.map((v) => Math.min(v * brightness, 1));
}

/**
 * Converts histogram data into the specified waveform representation.
 * @param {Array} histogram - Original histogram data.
 * @param {number} populationSize - Total number of particles.
 * @param {number} n - The size of the wave as a decimal.
 * @returns {Array} - A computed array of equivalent size as the input.
 */
function toWave(histogram, populationSize, n, waveform = 'square') {
    if (waveform === 'square') {
        return toWaveSquare(histogram, populationSize, n);
    }
    else if (waveform === 'triangle') {
        return toWaveTriangle(histogram, populationSize, n);
    }
    else if (waveform === 'sine') {
        return toWaveSine(histogram, populationSize, n);
    }
    else if (waveform === 'cosine') {
        return toWaveCosine(histogram, populationSize, n);
    }
    return toWaveNone(histogram, populationSize);
}

export { toWave, toWaveNone };
