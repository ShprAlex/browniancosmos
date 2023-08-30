const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CELL_SIZE;
let GRID_HEIGHT;
let GRID_WIDTH;
let BROWNIAN_VELOCITY;
let START_WAVELENGTH;
let END_WAVELENGTH;
let WAVE_SHAPE;
let INITAL_PARTICLES;
let MAX_PARTICLES;
let PALETTE;
let RAMP_UP_PARTICLES;

let params;
let simulation;
let animationRequest;

window.addEventListener('load', () => {
    AnimationHandler.initialize(); AnimationHandler.reset(); AnimationHandler.animate();
});

function getParam(key) {
    const configurationName = params.get('configuration') || 'default';
    const configurationParams = getConfiguration(configurationName) || getConfiguration('default');
    let paramValue = params.get(key);
    if (paramValue === null) {
        return configurationParams[key];
    }
    if (!isNaN(paramValue)) {
        paramValue = parseFloat(paramValue);
    }
    return paramValue;
}

class AnimationHandler {
    static initialize() {
        params = new URLSearchParams(window.location.search);
        Scroller.initialize();
    }

    static reset() {
        if (animationRequest) {
            window.cancelAnimationFrame(animationRequest);
        }
        canvas.dispatchEvent(new CustomEvent('resetstart', { bubbles: true }));

        canvas.width = getParam('width');
        canvas.height = getParam('height');

        CELL_SIZE = getParam('cellsize');
        GRID_HEIGHT = Math.floor(canvas.height / CELL_SIZE);
        GRID_WIDTH = Math.ceil(canvas.width / CELL_SIZE);
        BROWNIAN_VELOCITY = getParam('velocity');
        START_WAVELENGTH = getParam('startw');
        END_WAVELENGTH = getParam('endw');
        MAX_PARTICLES = getParam('particles');
        RAMP_UP_PARTICLES = (START_WAVELENGTH === 0);
        INITAL_PARTICLES = (RAMP_UP_PARTICLES ? 0 : MAX_PARTICLES);
        WAVE_SHAPE = getParam('waveshape');
        PALETTE = getParam('palette');

        simulation = new BrownianSimulation(INITAL_PARTICLES, GRID_HEIGHT);
        Renderer.reset();
        Scroller.reset();
        canvas.dispatchEvent(new CustomEvent('resetend', { bubbles: true }));
    }

    /**
     * To better illustrate what's going on we start with few particles on the left side and ramp up the
     * number to MAX_PARTICLES over a short duration making their individual paths visible.
     */
    static rampUpParticles() {
        if (!RAMP_UP_PARTICLES) {
            return;
        }
        // initial gap on the left where we don't draw anything.
        if (progress < 10) {
            return;
        }
        simulation.increasePopulation(Math.min(MAX_PARTICLES, progress * (1 + progress / 100)));
    }

    static updateStatusText() {
        const statusTextEl = document.getElementById('statusText');
        if (!finishedRendering) {
            statusTextEl.textContent = `Loading ${Renderer.getProgressPercent()}%`;
        }
        else {
            statusTextEl.textContent = '';
        }
    }

    static animate() {
        if (!finishedRendering) {
            Renderer.draw(AnimationHandler.rampUpParticles);
        }
        if (!finishedScrolling) {
            Scroller.scroll();
        }
        AnimationHandler.updateStatusText();
        if (!finishedRendering || !finishedScrolling) {
            animationRequest = requestAnimationFrame(AnimationHandler.animate);
        }
    }
}
