const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let columns = [];
const columnWidth = 2;
const segmentHeight = 2;


const scrollingDiv = document.getElementById('scrollingDiv');
scrollingDiv.scrollTop = 2400-scrollingDiv.offsetHeight;     
scrollingDiv.addEventListener('wheel', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchstart', stopAutoScroll, {passive: true});
scrollingDiv.addEventListener('touchmove', stopAutoScroll, {passive: true});

let scrollSpeed = 2;
let autoScrollEnabled = true;

const histogram_size = 1200;
const initial_population = 0;
const max_population = 1000;

canvas.width = 7200;
canvas.height = histogram_size*segmentHeight;// (window.innerHeight-20)/2;

let simulation = new Simulation(initial_population, histogram_size);
let count =0;

function fillGrid() {
    const columnCount = Math.floor(canvas.width / columnWidth);
    columns = [];
    //n = Math.min(60,Math.pow(1.04, count-12))+Math.pow(1.017, count-12)-1;
    if (count>=10 && count<max_population) {
        simulation.increasePopulation(Math.min(max_population,Math.max(count,count*count/100)));
    }
    

    for (let i = 0; i < 10; i++) {
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
        //const segmentCount = Math.floor(canvas.height / segmentHeight);
        const newColors = [];
        //console.log(wave_column.length);
        for (let j = 0; j < red_column.length; j++) {
            let r = Math.round(red_column[j]*255);
            //let g = Math.round((1-Math.pow(1-green_column[j],0.8))*255);
            let g = Math.round(green_column[j]*255);
            let b = Math.round(blue_column[j]*255);
            //newColors.push(getRandomColor());
            newColors.push("rgb("+r+", "+g+", "+b+")");
        }
        columns.push({ colors: newColors });
        count+=1;
    }
}

function stopAutoScroll() {
   if (count>canvas.width/columnWidth/3 && scrollingDiv.scrollLeft===0 || scrollingDiv.scrollLeft===canvas.width-scrollingDiv.offsetWidth) {
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

function draw() {
    if (count<=canvas.width/columnWidth) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        let loadedPercent = Math.ceil(count*columnWidth/canvas.width*100);
        document.getElementById('overlayText').textContent = 'Loading '+loadedPercent+'%';
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            for (let j = 0; j < column.colors.length; j++) {
                ctx.fillStyle = column.colors[j];
                ctx.fillRect((i+(count)-2) * columnWidth, j * segmentHeight, columnWidth, segmentHeight);
            }
        }
        fillGrid();
    }
    if (count>=canvas.width/columnWidth) {
        document.getElementById('overlayText').textContent = '';
    }
}

function animate() {
    scroll();
    draw();
    requestAnimationFrame(animate);
}

