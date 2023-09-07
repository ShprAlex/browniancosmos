function normalizeBrightness(histogramSize, populationSize, spanSize, pointValue) {
    if (pointValue === 0 || populationSize === 0) {
        return 0;
    }
    let b = Math.max(0, pointValue * Math.sqrt(histogramSize / spanSize / populationSize) / 2.3);
    // Scale down the brigest values to below 1, while keeping most of the colors saturated.
    if (b > 0.85) {
        b = (b - 0.85) / 5 + 0.85;
    }
    return b;
}

/**
 * Scans over the histogram and for every index subtracts the sum of the next n numbers from
 * the previous n numbers. This simple sum is a bit like a 'square' wave that has sharp
 * boundary conditions sensitive to noise.
 */
function toWaveSquare(histogram, populationSize, n) {
    let HISTOGRAM_SIZE = histogram.length;
    let column = new Array(HISTOGRAM_SIZE).fill(0);
    let r = Math.floor(n);
    let fraction = n - r;
    let running_sum = 0;

    const modh = (v) => (v % HISTOGRAM_SIZE + HISTOGRAM_SIZE) % HISTOGRAM_SIZE;

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
 */
function toWaveNone(histogram, populationSize) {
    let HISTOGRAM_SIZE = histogram.length;
    const brightness = HISTOGRAM_SIZE / populationSize / 2;
    return histogram.map((v) => Math.min(v * brightness, 1));
}

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
