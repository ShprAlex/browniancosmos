import BrownianSimulation from './brownian.js';
import { getConfiguration } from './configurations.js';
import {
    finishedRendering,
    getRendererProgressPercent,
    render,
    rendererProgress,
    resetRenderer,
} from './renderer.js';
import { finishedScrolling, initializeScroller, resetScroller, scroll } from './scroller.js';
import './settings.js';
import './toolbar.js';


const canvas = document.getElementById('canvas');

let CELL_SIZE;
let GRID_HEIGHT;
let GRID_WIDTH;
let BROWNIAN_VELOCITY;
let START_WAVELENGTH;
let END_WAVELENGTH;
let WAVEFORM;
let INITAL_PARTICLES;
let MAX_PARTICLES;
let PALETTE;
let RAMP_UP_PARTICLES;

let params;
let simulation;
let animationRequest;

window.addEventListener('load', () => {
    initialize(); reset(); animate();
});

function getConfigurationId() {
    return params.get('configuration') || 'welcome';
}

function getParam(key) {
    const configurationParams = getConfiguration(getConfigurationId()) || getConfiguration('default');
    let paramValue = params.get(key);
    if (paramValue === null) {
        return configurationParams[key];
    }
    if (!isNaN(paramValue)) {
        paramValue = parseFloat(paramValue);
    }
    return paramValue;
}

function isWelcomeConfig() {
    return params.size == 0 || params.get('configuration') === 'welcome';
}

function isDefaultConfig() {
    const configurationId = params.get('configuration');
    return configurationId === 'default' || !getConfiguration(configurationId);
}


function initialize() {
    initializeScroller();
}

function reset() {
    params = new URLSearchParams(window.location.search);
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
    WAVEFORM = getParam('waveform');
    PALETTE = getParam('palette');

    simulation = new BrownianSimulation(INITAL_PARTICLES, GRID_HEIGHT);
    resetRenderer();
    resetScroller();
    canvas.dispatchEvent(new CustomEvent('resetend', { bubbles: true }));
}

/**
 * To better illustrate what's going on we start with few particles on the left side and ramp up the
 * number to MAX_PARTICLES over a short duration making their individual paths visible.
 */
function rampUpParticles() {
    if (!RAMP_UP_PARTICLES) {
        return;
    }
    // initial gap on the left where we don't draw anything.
    if (rendererProgress < 10) {
        return;
    }
    else {
        simulation.increasePopulation(
            Math.min(MAX_PARTICLES,
                Math.max(
                    rendererProgress,
                    rendererProgress * rendererProgress / 50,
                    Math.pow(1.03, rendererProgress)
                ),
            )
        );
    }
}

function updateStatusText() {
    const statusTextEl = document.getElementById('statusText');
    if (!finishedRendering) {
        statusTextEl.textContent = `Loading ${getRendererProgressPercent()}%`;
    }
    else {
        statusTextEl.textContent = '';
    }
}

function animate() {
    if (!finishedRendering) {
        render(rampUpParticles);
    }
    if (!finishedScrolling) {
        scroll();
    }
    updateStatusText();
    if (!finishedRendering || !finishedScrolling) {
        animationRequest = requestAnimationFrame(animate);
    }
}

export {
    BROWNIAN_VELOCITY,
    CELL_SIZE,
    END_WAVELENGTH,
    GRID_HEIGHT,
    GRID_WIDTH,
    INITAL_PARTICLES,
    MAX_PARTICLES,
    PALETTE,
    RAMP_UP_PARTICLES,
    START_WAVELENGTH,
    WAVEFORM,
    animate as animate,
    getConfigurationId,
    getParam,
    isDefaultConfig,
    isWelcomeConfig,
    reset as resetApplication,
    simulation
};
