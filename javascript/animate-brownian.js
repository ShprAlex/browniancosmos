const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scrollingDiv = document.getElementById('scrollingDiv');
const applicationTitleEl = document.getElementById('applicationTitle');

let CELL_SIZE;
let DRAW_COLUMN_BATCH_SIZE;
let GRID_HEIGHT;
let GRID_WIDTH;
let BROWNIAN_VELOCITY;
let START_WAVELENGTH;
let END_WAVELENGTH;
let INITAL_PARTICLES;
let MAX_PARTICLES;

let params;
let simulation;
let scrollSpeed;
let scrollLeft;
let scrollTop;
let startedScrolling;
let finishedScrolling;
let finishedRendering;
let progress = 0;
let hideApplicationTitleCount = 0;

window.addEventListener('load', ()=>{initialize(); reset(); animate();});

function initialize() {
    params = new URLSearchParams(window.location.search);

    scrollingDiv.addEventListener('scrollend', updateAutoScroll, {passive: true});
    scrollingDiv.addEventListener('touchstart', updateAutoScroll, {passive: true});
    scrollingDiv.addEventListener('touchmove', updateAutoScroll, {passive: true});
    scrollingDiv.addEventListener('scrollend', updateApplicationTitle, {passive: true});
    scrollingDiv.addEventListener('touchstart', updateApplicationTitle, {passive: true});
    scrollingDiv.addEventListener('touchmove', updateApplicationTitle, {passive: true});
}
function getParam(key) {
    let defaultParams = getPresets("default");
    return parseInt(params.get(key)) || defaultParams[key];
}

function reset() {
    CELL_SIZE = getParam("cellsize");
    DRAW_COLUMN_BATCH_SIZE = 10;

    canvas.width = getParam("width");
    canvas.height = getParam("height");

    GRID_HEIGHT = Math.floor(canvas.height/CELL_SIZE);
    GRID_WIDTH = Math.ceil(canvas.width/CELL_SIZE);
    BROWNIAN_VELOCITY = getParam("velocity");
    START_WAVELENGTH = getParam("startw");
    END_WAVELENGTH = getParam("endw");
    INITAL_PARTICLES = 0;
    MAX_PARTICLES = getParam("particles");

    scrollSpeed = 2;
    startedScrolling = false;
    finishedScrolling = false;
    finishedRendering = false;
    progress = 0;
    hideApplicationTitleCount = 0;
    simulation = new Simulation(INITAL_PARTICLES, GRID_HEIGHT);

    scrollLeft = 0;
    scrollTop = canvas.clientHeight-scrollingDiv.offsetHeight;
    scrollingDiv.scrollLeft = scrollLeft;
    scrollingDiv.scrollTop = scrollTop;
}

function drawColumn(x, waveLength) {
    let red_column;
    let green_column;
    let blue_column;
    if (END_WAVELENGTH>1) {
        red_column = simulation.toWave(waveLength);
        green_column = simulation.toWave(waveLength/2+0.5);
        blue_column = simulation.toWave(waveLength/4+0.75);
    }
    else {
        let brightness = GRID_HEIGHT/MAX_PARTICLES/2;
        column = simulation.histogram.map(v=>Math.min(v*brightness,1));
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

function updateSimulation() {
    if (progress<10 && START_WAVELENGTH==1 && END_WAVELENGTH != 1) {
        return;
    }
    if (START_WAVELENGTH>1 || END_WAVELENGTH == 1 || progress>300 || MAX_PARTICLES<30) {
        simulation.increasePopulation(MAX_PARTICLES);
    } else if (progress<=MAX_PARTICLES) {
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
        [Math.min(120,GRID_WIDTH/8),1],
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
    for (let i = 0; i < DRAW_COLUMN_BATCH_SIZE; i++) {
        simulation.step(BROWNIAN_VELOCITY);
        drawColumn(progress, computeWavelength());
        progress++;
        if (progress==GRID_WIDTH) {
            break;
        }
    }
    if (progress==GRID_WIDTH) {
        finishedRendering = true;
        if (GRID_WIDTH-1<=window.innerWidth/CELL_SIZE) {
            showApplicationTitle(true);
        }
    }
}

function updateAutoScroll() {
    const leftSide = scrollSpeed;
    const rightSide = canvas.clientWidth-scrollingDiv.offsetWidth;
    if (
        startedScrolling 
        && !finishedScrolling 
        && (scrollingDiv.scrollLeft<=leftSide || scrollingDiv.scrollLeft>=rightSide)
    ) {
        scrollLeft = scrollingDiv.scrollLeft;
        scrollTop = scrollingDiv.scrollTop;
        finishedScrolling = true;
    }
}

function scroll() {
    if (Math.abs(scrollLeft-scrollingDiv.scrollLeft)>scrollSpeed || Math.abs(scrollTop-scrollingDiv.scrollTop)>scrollSpeed) {
        scrollLeft = scrollingDiv.scrollLeft;
        scrollTop = scrollingDiv.scrollTop;
    }
    if (progress>window.innerWidth/CELL_SIZE) {
        if (!startedScrolling) {
            scrollLeft+=scrollSpeed; // extra boost at the start
        }
        startedScrolling = true;
        scrollLeft+=scrollSpeed;
        scrollLeft = Math.min(scrollLeft, canvas.clientWidth-scrollingDiv.offsetWidth);
        // When starting waves are small, start scrolling up a quarter of the way through the animation.
        // Don't scroll up if the canvas height is only a little bigger than the window height.
        if ((scrollLeft>canvas.clientWidth/4 || START_WAVELENGTH>10) && canvas.clientHeight>window.innerHeight*1.2) {
            const distLeft = Math.max(0.01, canvas.clientWidth-scrollingDiv.offsetWidth-scrollLeft);
            scrollTop -= Math.min(1,scrollTop/distLeft)*scrollSpeed;
            scrollTop = Math.max(0, scrollTop);
        }
        scrollingDiv.scrollLeft = scrollLeft;
        scrollingDiv.scrollTop = scrollTop;
    }
}

function updateStatusText() {
    const statusTextEl = document.getElementById('statusText');
    if (!finishedRendering) {
        let loadedPercent = Math.ceil(progress*CELL_SIZE/canvas.width*100);
        statusTextEl.textContent = 'Loading '+loadedPercent+'%';
    }
    else {
        statusTextEl.textContent = '';
    }
}

function showApplicationTitle(show) {
    if (show) {
        applicationTitleEl.style.opacity=1;
        applicationTitleEl.style.visibility='visible';
    }
    else {
        applicationTitleEl.style.opacity=0;
        applicationTitleEl.style.visibility='hidden';
    }
}

function updateApplicationTitle(event = null) {
    const rightSide = canvas.clientWidth-scrollingDiv.offsetWidth;
    if(
        (scrollingDiv.scrollLeft>=rightSide-150)
        && window.innerWidth<canvas.clientWidth
        && !modalVisible
        && finishedScrolling === false
    ) {
        showApplicationTitle(true);
    }
    else {
        if (finishedScrolling && (scrollLeft!=scrollingDiv.scrollLeft || scrollTop!=scrollingDiv.scrollTop)) {
            showApplicationTitle(false);
        }
    }
}

function animate() {
    if (!finishedRendering) {
        updateSimulation();
        draw();
        updateStatusText();
    }
    if (!finishedScrolling) {
        scroll();
    }
    if(!finishedRendering || !finishedScrolling) {
        requestAnimationFrame(animate);
    }
}
