const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CELL_SIZE;
let GRID_HEIGHT;
let GRID_WIDTH;
let BROWNIAN_VELOCITY;
let START_WAVELENGTH;
let END_WAVELENGTH;
let INITAL_PARTICLES;
let MAX_PARTICLES;

let params;
let simulation;

window.addEventListener('load', ()=>{
    AnimationHandler.initialize(); AnimationHandler.reset(); AnimationHandler.animate();
});

function getParam(key) {
    const configurationName = params.get("configuration") || "default";
    const configurationParams = getConfiguration(configurationName) || getConfiguration("default");
    const paramValue = params.get(key);
    return paramValue!=null ? parseInt(paramValue) : configurationParams[key];
}

class AnimationHandler {
    static initialize() {
        params = new URLSearchParams(window.location.search);
        Scroller.initialize();
    }

    static reset() {
        CELL_SIZE = getParam("cellsize");
    
        canvas.width = getParam("width");
        canvas.height = getParam("height");

        GRID_HEIGHT = Math.floor(canvas.height/CELL_SIZE);
        GRID_WIDTH = Math.ceil(canvas.width/CELL_SIZE);
        BROWNIAN_VELOCITY = getParam("velocity");
        START_WAVELENGTH = getParam("startw");
        END_WAVELENGTH = getParam("endw");
        INITAL_PARTICLES = 0;
        MAX_PARTICLES = getParam("particles");

        simulation = new Simulation(INITAL_PARTICLES, GRID_HEIGHT);
        Renderer.reset();
        Scroller.reset();
    }

    /**
     * To better illustrate what's going on we start with few particles on the left side and ramp up the
     * number to MAX_PARTICLES over a short duration making their individual paths visible.
     */
    static rampUpParticles() {
        // initial gap on the left where we don't draw anything.
        if (progress<10 && START_WAVELENGTH==1 && END_WAVELENGTH != 1 && canvas.width>500 && BROWNIAN_VELOCITY>0) {
            return;
        }
        if (START_WAVELENGTH>1 || END_WAVELENGTH == 1 || progress>300 || MAX_PARTICLES<30 || BROWNIAN_VELOCITY === 0) {
            simulation.increasePopulation(MAX_PARTICLES);
        } else if (progress<=MAX_PARTICLES) {
            simulation.increasePopulation(Math.min(MAX_PARTICLES,Math.max(progress,progress*progress/100)));
        }
    }

    static updateStatusText() {
        const statusTextEl = document.getElementById('statusText');
        if (!finishedRendering) {
            let loadedPercent = Math.ceil(progress*CELL_SIZE/canvas.width*100);
            statusTextEl.textContent = 'Loading '+loadedPercent+'%';
        }
        else {
            statusTextEl.textContent = '';
        }
    }

    static animate() {
        if (!finishedRendering) {
            AnimationHandler.rampUpParticles();
            Renderer.draw();
            AnimationHandler.updateStatusText();
        }
        if (!finishedScrolling) {
            Scroller.scroll();
        }
        if(!finishedRendering || !finishedScrolling) {
            requestAnimationFrame(AnimationHandler.animate);
        }
    }
}
