const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let params = new URLSearchParams(window.location.search);

const columnWidth = params.get("cellsize") || 2;
const segmentHeight = params.get("cellsize") || 2;
const drawColumnBatchSize = 10;

canvas.width = params.get("width") || 7200;
canvas.height = params.get("height") || 2400;

let scrollSpeed = 2;
let autoScrollEnabled = true;
let finishedRendering = false;

const histogram_size = Math.floor(canvas.height/segmentHeight);
const columns_size = Math.ceil(canvas.width/columnWidth);
const brownianVelocity = params.get("velocity") || 5;
const startWavelength = Math.max(params.get("startw"),1) || 1;
const endWavelength = params.get("endw") || histogram_size/1.5;
const initial_particles = 0;
const max_particles = params.get("particles") || 1000;

let simulation = new Simulation(initial_particles, histogram_size);
let progress = 0;

const scrollingDiv = document.getElementById('scrollingDiv');
scrollingDiv.scrollTop = canvas.height-scrollingDiv.offsetHeight;
scrollingDiv.addEventListener('wheel', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchstart', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchmove', stopAutoScroll, {passive: true});

function drawColumn(x, waveLength) {
    const red_column = simulation.toWave(waveLength);
    const green_column = simulation.toWave(waveLength/2+0.5);
    const blue_column = simulation.toWave(waveLength/4+0.75);

    for (let y = 0; y < histogram_size; y++) {
        let r = Math.round(red_column[y]*255);
        let g = Math.round(green_column[y]*255);
        let b = Math.round(blue_column[y]*255);

        ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
        ctx.fillRect(x * columnWidth, y * segmentHeight, columnWidth, segmentHeight);
    }
}

function updateSimulation() {
    if (startWavelength>1) {
    simulation.increasePopulation(max_particles);
    } else if (progress>=10 && (progress<=max_particles || max_particles<10)) {
        simulation.increasePopulation(Math.min(max_particles,Math.max(progress,progress*progress/100)));
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
        [columns_size,endWavelength],
    ];

    let waveLength = 1;
    let prevStage = wavelength_growth_stages[0];

    for (stage of wavelength_growth_stages) {
        if(stage[0]!==columns_size && stage[0]*2>columns_size) {
            continue;
        }
        if (progress<stage[0]) {
            prevLength = prevStage[1]+startWavelength-1;
            targetLength = Math.min(endWavelength,stage[1]+startWavelength-1);

            stage_length = stage[0]-prevStage[0];
            stage_progress = progress-prevStage[0];

            p = Math.pow(targetLength/prevLength, 1/stage_length);
            waveLength=prevLength*Math.pow(p,stage_progress);
            break;
        }
        if (progress>=stage[0] ) {
            prevStage = stage;
            waveLength = stage[1]+startWavelength;
        }
    }

    waveLength = Math.min(Math.min(endWavelength,Math.max(startWavelength,waveLength)));
    return waveLength;
}

function draw() {
    if (!finishedRendering) {
        for (let i = 0; i < drawColumnBatchSize; i++) {
            simulation.step(brownianVelocity);
            drawColumn(progress, computeWavelength());
            console.log(progress,columns_size)
            progress++;
            if (progress==columns_size) {
                finishedRendering=true;
                break;
            }
        }
    }
}

function stopAutoScroll() {
    const initialDelay = columns_size/3;
    const leftSide = scrollSpeed;
    const rightSide = canvas.width-scrollingDiv.offsetWidth;
    if (progress>initialDelay && scrollingDiv.scrollLeft<=leftSide || scrollingDiv.scrollLeft>=rightSide) {
        autoScrollEnabled = false;
    }
}

function scroll() {
    if (progress>window.innerWidth/columnWidth && autoScrollEnabled && progress<canvas.width*10) {
        let scrollLeft= scrollingDiv.scrollLeft;
        scrollLeft = (scrollLeft + scrollSpeed);
        scrollingDiv.scrollLeft = scrollLeft;
        let scrollTop = scrollingDiv.scrollTop;
        if (scrollLeft>canvas.width/4) {
            const distLeft = canvas.width-scrollingDiv.offsetWidth-scrollingDiv.scrollLeft+0.01;
            scrollTop-=Math.min(1,scrollingDiv.scrollTop/distLeft)*scrollSpeed;
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
        let loadedPercent = Math.ceil(progress*columnWidth/canvas.width*100);
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
