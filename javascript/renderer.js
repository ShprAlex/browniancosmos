let finishedRendering;
let progress = 0;

const DRAW_COLUMN_BATCH_SIZE = 10;

class Renderer {
    static reset() {
        finishedRendering = false;
        progress = 0;
    }

    static drawColumn(x, waveLength) {
        let red_column;
        let green_column;
        let blue_column;
        if (END_WAVELENGTH>1) {
            red_column = simulation.toWave(waveLength);
            green_column = simulation.toWave(waveLength/2+0.5);
            blue_column = simulation.toWave(waveLength/4+0.75);
        }
        else {
            const brightness = GRID_HEIGHT/MAX_PARTICLES/2;
            const column = simulation.histogram.map(v=>Math.min(v*brightness,1));
            red_column = column;
            green_column = column;
            blue_column = column;
        }

        for (let y = 0; y < GRID_HEIGHT; y++) {
            let r = Math.round(red_column[y]*255);
            let g = Math.round(green_column[y]*255);
            let b = Math.round(blue_column[y]*255);

            ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }

    /**
     * computeWavelenth interpolates the number of columns we've drawn so far to compute the
     * wavelength for processing the next column.
     *
     * Interpolation allow us to reduce the awkward stage where the wavelength is in the low digits
     * so we can give more screen space to the nicer looking longer waves. At the same time we want
     * to keep the initial waves with wavelengh = 1 if desired to visually explain what's happening.
     */
    static computeWavelength() {
        let wavelength_growth_stages = [
            [1,1],
            [Math.min(120,GRID_WIDTH/8),1],
            [400,15],
            [800,25],
            [GRID_WIDTH,END_WAVELENGTH],
        ];

        let waveLength = 1;
        let prevStage = wavelength_growth_stages[0];
        const lastStage =wavelength_growth_stages[wavelength_growth_stages.length-1];
        for (const stage of wavelength_growth_stages) {
            if(stage!==lastStage && stage[0]*2>GRID_WIDTH) {
                continue;
            }
            if (progress<stage[0]) {
                const prevLength = prevStage[1]+START_WAVELENGTH-1;
                const targetLength = Math.min(END_WAVELENGTH,stage[1]+START_WAVELENGTH-1);

                const stage_length = stage[0]-prevStage[0];
                const stage_progress = progress-prevStage[0];

                const p = Math.pow(targetLength/prevLength, 1/stage_length);
                waveLength=prevLength*Math.pow(p,stage_progress);
                break;
            }
            if (progress>=stage[0] ) {
                prevStage = stage;
                waveLength = stage[1]+START_WAVELENGTH;
            }
        }
        waveLength = Math.min(Math.min(END_WAVELENGTH,Math.max(START_WAVELENGTH,waveLength)));
        return waveLength;
    }

    static draw() {
        for (let i = 0; i < DRAW_COLUMN_BATCH_SIZE; i++) {
            simulation.step(BROWNIAN_VELOCITY);
            Renderer.drawColumn(progress, Renderer.computeWavelength());
            progress++;
            if (progress==GRID_WIDTH) {
                break;
            }
        }
        if (progress==GRID_WIDTH) {
            finishedRendering = true;
            canvas.dispatchEvent(new CustomEvent('renderingend', {bubbles: true}));
        }
    }
}
