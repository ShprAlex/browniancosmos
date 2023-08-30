let finishedRendering;
let progress = 0;

let DRAW_COLUMN_BATCH_SIZE;

class Renderer {
    static reset() {
        finishedRendering = false;
        progress = 0;
        DRAW_COLUMN_BATCH_SIZE = (WAVE_SHAPE === 'square' || WAVE_SHAPE === 'none' ? 10 : 2);
    }

    static drawColumn(x, waveLength) {
        let red_column;
        let green_column;
        let blue_column;
        const histogram = simulation.getHistogram();
        if (END_WAVELENGTH > 1) {
            red_column = HistogramToWave.toWave(histogram, simulation.POPULATION_SIZE, waveLength, WAVE_SHAPE);
            if (PALETTE !== 'bw') {
                green_column = HistogramToWave.toWave(histogram, simulation.POPULATION_SIZE, waveLength / 2 + 0.5, WAVE_SHAPE);
                blue_column = HistogramToWave.toWave(histogram, simulation.POPULATION_SIZE, waveLength / 4 + 0.75, WAVE_SHAPE);
            }
        } else {
            const column = HistogramToWave.toWaveNone(histogram, simulation.POPULATION_SIZE);
            red_column = column;
            green_column = column;
            blue_column = column;
        }

        for (let y = 0; y < GRID_HEIGHT; y++) {
            let r, g, b;
            if (PALETTE === 'bw') {
                r = g = b = Math.round(red_column[y] * 255);
            }
            else {
                r = Math.round(red_column[y] * 255);
                g = Math.round(green_column[y] * 255);
                b = Math.round(blue_column[y] * 255);
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
     * to keep the initial waves with wavelengh = 1 if desired to visually explain what's happening.
     */
    static computeWavelength() {
        // We're hacking START_WAVELENGTH === 0 as a signal to ramp up particles, so we need to
        // bring this back to 1.
        const FIXED_START_WAVELENGTH = Math.max(START_WAVELENGTH, 1);

        let waveRange = END_WAVELENGTH - FIXED_START_WAVELENGTH;
        if (waveRange <= 0) {
            return END_WAVELENGTH;
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

    static getProgressPercent() {
        if (!finishedRendering) {
            return Math.ceil(progress * CELL_SIZE / canvas.width * 100);
        }
        return 100;
    }

    static draw(updateAfterDrawColumn) {
        for (let i = 0; i < DRAW_COLUMN_BATCH_SIZE; i++) {
            simulation.step(BROWNIAN_VELOCITY);
            Renderer.drawColumn(progress, Renderer.computeWavelength());
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
}
