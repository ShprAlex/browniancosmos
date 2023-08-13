const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const columnWidth = 2;
const segmentHeight = 2;
const drawColumnBatchSize = 10;

let scrollSpeed = 2;
let autoScrollEnabled = true;

const histogram_size = 1200;
const initial_population = 0;
const max_population = 1000;

canvas.width = 7200;
canvas.height = histogram_size*segmentHeight;

let simulation = new Simulation(initial_population, histogram_size);
let count =0;

const scrollingDiv = document.getElementById('scrollingDiv');
scrollingDiv.scrollTop = canvas.height-scrollingDiv.offsetHeight;
scrollingDiv.addEventListener('wheel', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchstart', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchmove', stopAutoScroll, {passive: true});

function drawColumn() {
    n = (
        Math.min(20,Math.pow(1.01, count-120))+
        Math.min(35,Math.pow(1.004, count-120))+
        Math.pow(1.00191, count-120)-2
    );
    n = Math.max(1,n);
    simulation.step(5);
    const red_column = simulation.toWaveRough(n);
    const green_column = simulation.toWaveRough(n/2+0.5);
    const blue_column = simulation.toWaveRough(n/4+0.75);

    for (let j = 0; j < red_column.length; j++) {
        let r = Math.round(red_column[j]*255);
        let g = Math.round(green_column[j]*255);
        let b = Math.round(blue_column[j]*255);

        ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
        ctx.fillRect(count * columnWidth, j * segmentHeight, columnWidth, segmentHeight);
    }
}

function draw() {
    if (count>=10 && count<max_population) {
        simulation.increasePopulation(Math.min(max_population,Math.max(count,count*count/100)));
    }

    if (count<=canvas.width/columnWidth) {
        for (let i = 0; i < drawColumnBatchSize; i++) {
            drawColumn();
            count++;
        }
    }
}

function stopAutoScroll() {
    const initialDelay = canvas.width/columnWidth/3;
    const leftSide = scrollSpeed;
    const rightSide = canvas.width-scrollingDiv.offsetWidth;
    if (count>initialDelay && scrollingDiv.scrollLeft<=leftSide || scrollingDiv.scrollLeft>=rightSide) {
        autoScrollEnabled = false;
    }
}

function scroll() {
    if (count>window.innerWidth/columnWidth && autoScrollEnabled && count<canvas.width*10) {
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
    if (count>canvas.width/columnWidth) {
        count+=10;
    }
}

function updateUi() {
    if (count<=canvas.width/columnWidth) {
        let loadedPercent = Math.ceil(count*columnWidth/canvas.width*100);
        document.getElementById('overlayText').textContent = 'Loading '+loadedPercent+'%';
    }
    else {
        document.getElementById('overlayText').textContent = '';
    }
}

function animate() {
    draw();
    scroll();
    updateUi();
    requestAnimationFrame(animate);
}
