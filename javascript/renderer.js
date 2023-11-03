import {
    BROWNIAN_VELOCITY,
    CELL_SIZE,
    END_WAVELENGTH,
    GRID_HEIGHT,
    GRID_WIDTH,
    PALETTE,
    START_WAVELENGTH,
    WAVEFORM,
    simulation
} from './app.js';

import { toWave, toWaveNone } from './histogram-to-wave.js';

const ctx = canvas.getContext('2d');

let finishedRendering;
let progress = 0;

let DRAW_COLUMN_BATCH_SIZE;

function reset() {
    finishedRendering = false;
    progress = 0;
    DRAW_COLUMN_BATCH_SIZE = (WAVEFORM === 'square' || WAVEFORM === 'none' ? 10 : 2);
}

function drawColumn(x, waveLength) {
    let redColumn;
    let greenColumn;
    let blueColumn;
    const histogram = simulation.getHistogram();
    if (END_WAVELENGTH > 1) {
        redColumn = toWave(histogram, simulation.POPULATION_SIZE, waveLength, WAVEFORM);
        if (PALETTE !== 'bw') {
            greenColumn = toWave(histogram, simulation.POPULATION_SIZE, waveLength / 2 + 0.5, WAVEFORM);
            blueColumn = toWave(histogram, simulation.POPULATION_SIZE, waveLength / 4 + 0.75, WAVEFORM);
        }
    } else {
        const column = toWaveNone(histogram, simulation.POPULATION_SIZE);
        redColumn = column;
        greenColumn = column;
        blueColumn = column;
    }

    for (let y = 0; y < GRID_HEIGHT; y++) {
        let r, g, b;
        if (PALETTE === 'bw') {
            r = g = b = Math.round(redColumn[y] * 255);
        }
        else {
            r = Math.round(redColumn[y] * 255);
            g = Math.round(greenColumn[y] * 255);
            b = Math.round(blueColumn[y] * 255);
        }
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

/**
 * computeWavelenth interpolates the number of columns we've drawn so far to compute the
 * wavelength for processing the next column.
 *
 * Interpolation allows us to reduce the awkward stage where the wavelength is in the low digits
 * so we can give more screen space to the nicer looking longer waves. At the same time we want
 * to keep the initial waves with wavelength = 1 if desired to visually explain what's happening.
 */
function computeWavelength() {
    // We're hacking START_WAVELENGTH === 0 as a signal to ramp up particles, so we need to
    // bring this back to 1.
    const FIXED_START_WAVELENGTH = Math.max(START_WAVELENGTH, 1);

    let waveRange = END_WAVELENGTH - FIXED_START_WAVELENGTH;
    if (waveRange <= 0) {
        return Math.max(FIXED_START_WAVELENGTH, END_WAVELENGTH);
    }
    if (FIXED_START_WAVELENGTH > 1) {
        const p = Math.pow(waveRange, 1 / GRID_WIDTH);
        return FIXED_START_WAVELENGTH + Math.pow(p, progress) - 1;
    }

    let initial = Math.min(120, GRID_WIDTH / 5);
    if (progress < initial) {
        return 1;
    }

    let linearHeight = (GRID_WIDTH - initial) / 20;
    let linearFactor = (progress - initial) / 20;
    if (linearHeight > waveRange) {
        return FIXED_START_WAVELENGTH + waveRange * (progress - initial) / (GRID_WIDTH - initial);
    }

    waveRange -= linearHeight;
    const p = Math.pow(waveRange, 1 / (GRID_WIDTH - initial));
    return FIXED_START_WAVELENGTH + Math.pow(p, progress - initial) + linearFactor - 1;
}

function getProgressPercent() {
    if (!finishedRendering) {
        return Math.ceil(progress * CELL_SIZE / canvas.width * 100);
    }
    return 100;
}

function render(updateAfterDrawColumn) {
    for (let i = 0; i < DRAW_COLUMN_BATCH_SIZE; i++) {
        simulation.step(BROWNIAN_VELOCITY);
        drawColumn(progress, computeWavelength());
        updateAfterDrawColumn();
        progress++;
        if (progress == GRID_WIDTH) {
            break;
        }
    }
    if (progress == GRID_WIDTH) {
        finishedRendering = true;
        canvas.dispatchEvent(new CustomEvent("renderingend", { bubbles: true }));
    }
}

export {
    finishedRendering,
    getProgressPercent as getRendererProgressPercent,
    render,
    progress as rendererProgress,
    reset as resetRenderer
};
