const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let columns = [];
const columnWidth = 2;
const segmentHeight = 2;


const scrollingDiv = document.getElementById('scrollingDiv');
scrollingDiv.scrollTop = 2400-scrollingDiv.offsetHeight;     
console.log(scrollingDiv.offsetHeight);
scrollingDiv.addEventListener('wheel', ()=>{scrollSpeed = 0;}, {passive: true});
scrollingDiv.addEventListener('touchstart', ()=>{scrollSpeed = 0;}, {passive: true});
scrollingDiv.addEventListener('touchmove', ()=>{scrollSpeed = 0;}, {passive: true});

let scrollPosition = 0;
let scrollSpeed = 2;

const histogram_size = 1200;
const initial_population = 0;
const max_population = 300;

canvas.width = 7200;
canvas.height = histogram_size*segmentHeight;// (window.innerHeight-20)/2;

let simulation = new Simulation(initial_population, histogram_size);
let count =0;

function fillGrid() {
    const columnCount = Math.floor(canvas.width / columnWidth);
    columns = [];
    //n = Math.min(60,Math.pow(1.04, count-12))+Math.pow(1.017, count-12)-1;
    if (count>=10 && count<300) {
        simulation.increasePopulation(Math.min(max_population,(count)));
    }
    

    for (let i = 0; i < 3; i++) {
        //n = Math.pow(1.006, count-100)-1;
        n = (
            Math.min(10,Math.pow(1.003, count-120))+
            Math.min(45,Math.pow(1.004, count-120))+
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

function setup() {

}

function draw() {
    if (count>window.innerWidth/columnWidth && scrollSpeed>0 && count<canvas.width*10) {
        scrollPosition = (scrollPosition + scrollSpeed);
        scrollingDiv.scrollLeft = scrollPosition;
        scrollingDiv.scrollTop = 2400-scrollingDiv.offsetHeight-Math.max(0,(scrollPosition-1800)/3);        
    }
    //canvas.style.height = ""+Math.max(100,300-Math.sqrt(count*2.1))+"vh";
    if (count<canvas.width) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            //console.log(column);
            for (let j = 0; j < column.colors.length; j++) {
                ctx.fillStyle = column.colors[j];
                ctx.fillRect((i+(count)-2) * columnWidth, j * segmentHeight, columnWidth, segmentHeight);
            }
        }
        fillGrid();
    }
    else {
        count+=10;
    }

    // if (count%240==120) {
    //     scrollPosition=0;
    // }

    // Shift columns and add new random column
    //columns.shift();
    

    // simulation.step(5);
    // const red_column = simulation.toWaveRough(40);
    // const green_column = simulation.toWaveRough(20);
    // const blue_column = simulation.toWaveRough(10);
    // //const segmentCount = Math.floor(canvas.height / segmentHeight);
    // const newColors = [];
    // //console.log(wave_column.length);
    // for (let j = 0; j < red_column.length; j++) {
    //     let r = Math.round(red_column[j]*255);
    //     let g = Math.round(green_column[j]*255);
    //     let b = Math.round(blue_column[j]*255);
    //     //newColors.push(getRandomColor());
    //     newColors.push("rgb("+r+", "+g+", "+b+")");
    // }
    // columns.push({ colors: newColors });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}



//setup();
//animate();