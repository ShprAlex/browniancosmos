import BrownianSimulation from './brownian.js';
import { loadConfiguration } from './configurations.js';
import { aboutModal } from './modals.js';
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

let configuration;
let simulation;
let animationRequest;

window.addEventListener('load', () => {
    initialize(); reset(); animate();
});

function isWelcomeConfig() {
    return configuration.id === 'welcome';
}

function isCustomConfig() {
    return configuration.id === 'custom';
}

function initialize() {
    initializeScroller();
}

function resetSettings(settingsData) {
    const urlParams = new URLSearchParams(settingsData);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `index.html?${urlParams.toString()}`);
    reset();
    animate();
    if (!isWelcomeConfig() && !isCustomConfig()) {
        aboutModal.show();
    }
}

function reset() {
    configuration = loadConfiguration(new URLSearchParams(window.location.search));
    if (animationRequest) {
        window.cancelAnimationFrame(animationRequest);
    }
    canvas.dispatchEvent(new CustomEvent('resetstart', { bubbles: true }));

    canvas.width = configuration.width;
    canvas.height = configuration.height;

    CELL_SIZE = configuration.cellsize;
    GRID_HEIGHT = Math.floor(canvas.height / CELL_SIZE);
    GRID_WIDTH = Math.ceil(canvas.width / CELL_SIZE);
    BROWNIAN_VELOCITY = configuration.velocity;
    START_WAVELENGTH = configuration.startw;
    END_WAVELENGTH = configuration.endw;
    MAX_PARTICLES = configuration.particles;
    RAMP_UP_PARTICLES = (START_WAVELENGTH === 0);
    INITAL_PARTICLES = (RAMP_UP_PARTICLES ? 0 : MAX_PARTICLES);
    WAVEFORM = configuration.waveform;
    PALETTE = configuration.palette;

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
    if (!finishedRendering && !isWelcomeConfig()) {
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
    configuration,
    isCustomConfig,
    isWelcomeConfig,
    reset as resetApplication,
    resetSettings,
    simulation
};
