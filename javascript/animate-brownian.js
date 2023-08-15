const params = new URLSearchParams(window.location.search);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CELL_WIDTH = params.get("cellsize") || 2;
const CELL_HEIGHT = params.get("cellsize") || 2;
const DRAW_COLUMN_BATCH_SIZE = 10;

canvas.width = params.get("width") || 7200;
canvas.height = params.get("height") || 2400;

let scrollSpeed = 2;
let autoScrollEnabled = true;
let finishedRendering = false;

const GRID_HEIGHT = Math.floor(canvas.height/CELL_HEIGHT);
const GRID_WIDTH = Math.ceil(canvas.width/CELL_WIDTH);
const BROWNIAN_VELOCITY = params.get("velocity") || 5;
const START_WAVELENGTH = Math.max(params.get("startw"),1) || 1;
const END_WAVELENGTH = params.get("endw") || GRID_HEIGHT/1.5;
const INITAL_PARTICLES = 0;
const MAX_PARTICLES = params.get("particles") || 1000;

let simulation = new Simulation(INITAL_PARTICLES, GRID_HEIGHT);
let progress = 0;

window.addEventListener('load', animate);

const scrollingDiv = document.getElementById('scrollingDiv');
scrollingDiv.scrollTop = canvas.height-scrollingDiv.offsetHeight;
scrollingDiv.addEventListener('wheel', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchstart', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchmove', stopAutoScroll, {passive: true});

function drawColumn(x, waveLength) {
    const red_column = simulation.toWave(waveLength);
    const green_column = simulation.toWave(waveLength/2+0.5);
    const blue_column = simulation.toWave(waveLength/4+0.75);

    for (let y = 0; y < GRID_HEIGHT; y++) {
        let r = Math.round(red_column[y]*255);
        let g = Math.round(green_column[y]*255);
        let b = Math.round(blue_column[y]*255);

        ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
        ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    }
}

function updateSimulation() {
    if (START_WAVELENGTH>1) {
        simulation.increasePopulation(MAX_PARTICLES);
    } else if (progress>=10 && (progress<=MAX_PARTICLES || MAX_PARTICLES<10)) {
        simulation.increasePopulation(Math.min(MAX_PARTICLES,Math.max(progress,progress*progress/100)));
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
function computeWavelength() {
    let wavelength_growth_stages = [
        [1,1],
        [120,1],
        [400,15],
        [800,25],
        [GRID_WIDTH,END_WAVELENGTH],
    ];

    let waveLength = 1;
    let prevStage = wavelength_growth_stages[0];
    const lastStage =wavelength_growth_stages[wavelength_growth_stages.length-1];
    for (stage of wavelength_growth_stages) {
        if(stage!==lastStage && stage[0]*2>GRID_WIDTH) {
            continue;
        }
        if (progress<stage[0]) {
            prevLength = prevStage[1]+START_WAVELENGTH-1;
            targetLength = Math.min(END_WAVELENGTH,stage[1]+START_WAVELENGTH-1);

            stage_length = stage[0]-prevStage[0];
            stage_progress = progress-prevStage[0];

            p = Math.pow(targetLength/prevLength, 1/stage_length);
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

function draw() {
    if (!finishedRendering) {
        for (let i = 0; i < DRAW_COLUMN_BATCH_SIZE; i++) {
            simulation.step(BROWNIAN_VELOCITY);
            drawColumn(progress, computeWavelength());
            progress++;
            if (progress==GRID_WIDTH) {
                finishedRendering=true;
                break;
            }
        }
    }
}

function stopAutoScroll() {
    const initialDelay = GRID_WIDTH/3;
    const leftSide = scrollSpeed;
    const rightSide = canvas.width-scrollingDiv.offsetWidth;
    if (progress>window.innerWidth/CELL_WIDTH+10 && (scrollingDiv.scrollLeft<=leftSide || scrollingDiv.scrollLeft>=rightSide)) {
        autoScrollEnabled = false;
    }
}

function scroll() {
    if (progress>window.innerWidth/CELL_WIDTH && autoScrollEnabled && progress<canvas.width*10) {
        let scrollLeft = scrollingDiv.scrollLeft;
        scrollLeft = (scrollLeft + scrollSpeed);
        scrollingDiv.scrollLeft = scrollLeft;
        let scrollTop = scrollingDiv.scrollTop;
        if (scrollLeft>canvas.width/4) {
            const distLeft = canvas.width-scrollingDiv.offsetWidth-scrollingDiv.scrollLeft+0.01;
            scrollTop -= Math.min(1,scrollingDiv.scrollTop/distLeft)*scrollSpeed;
        }

        scrollingDiv.scrollTop = scrollTop;
    }
    if (scrollingDiv.scrollLeft>0) {
        stopAutoScroll();
    }
    if (finishedRendering) {
        progress+=10;
    }
}

function updateUi() {
    if (!finishedRendering) {
        let loadedPercent = Math.ceil(progress*CELL_WIDTH/canvas.width*100);
        document.getElementById('overlayText').textContent = 'Loading '+loadedPercent+'%';
    }
    else {
        document.getElementById('overlayText').textContent = '';
    }
}

function animate() {
    updateSimulation();
    draw();
    scroll();
    updateUi();
    requestAnimationFrame(animate);
}
