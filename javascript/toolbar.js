import './about.js';
import { animate, configuration, resetApplication } from './app.js';
import { aboutModal, creditsModal, modalVisible } from './modals.js';
import { forceShowTitle, hideTitle, showTitle, titleVisible } from './title.js';

const fullscreenButton = document.getElementById('fullscreenButton');
const toolbarEl = document.getElementById('toolbar');
const chartInfoMenuItem = document.getElementById('chartInfoMenuItem');
const saveImageMenuItem = document.getElementById('saveImageMenuItem');
const showTitleMenuItem = document.getElementById('showTitleMenuItem');
const creditsMenuItem = document.getElementById('creditsMenuItem');
const reloadToobarButton = document.getElementById('reloadToolbarButton');
const additionalMenuDropdown = document.getElementById('additionalMenuDropdown');


function show() {
    toolbarEl.style.opacity = '1';
    toolbarEl.style.visibility = 'visible';
}

function hide() {
    toolbarEl.style.opacity = '0';
    toolbarEl.style.visibility = 'hidden';
}

function handleFullscreen(event) {
    event.stopPropagation();
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function handleBackgroundClick(event) {
    if (titleVisible()) {
        hideTitle();
        hide();
    }
    else if (!modalVisible) {
        showTitle();
        show();
    }
}

function handleResetEnd() {
    if (configuration.description) {
        chartInfoMenuItem.classList.remove('disabled');
    }
    else {
        chartInfoMenuItem.classList.add('disabled');
    }
}

window.addEventListener('load', () => {
    if (!document.fullscreenEnabled) {
        fullscreenButton.style.display = 'none';
        additionalMenuDropdown.style.padding = '0 max(12px, 0.9vw)';
    }
});

chartInfoMenuItem.addEventListener('click', (event) => { event.preventDefault(); aboutModal.show(); });
creditsMenuItem.addEventListener('click', (event) => { event.preventDefault(); creditsModal.show(); });
saveImageMenuItem.addEventListener('click', (event) => {
    event.preventDefault();
    const tempLink = document.createElement('a');
    tempLink.download = `BrownianCosmos${Math.floor(Date.now() / 1000) % 100000}.png`;
    tempLink.href = document.getElementById('canvas').toDataURL()
    tempLink.click();
    tempLink.remove();
});
showTitleMenuItem.addEventListener('click', (event) => {
    event.preventDefault();
    forceShowTitle();
    hide();
});
reloadToobarButton.addEventListener('click', () => {
    hideTitle();
    resetApplication();
    animate();
});

fullscreenButton.addEventListener('click', handleFullscreen);

canvas.addEventListener('showmodal', hide);
canvas.addEventListener('hidemodal', show);
canvas.addEventListener('resetend', handleResetEnd);
scrollingDiv.addEventListener('click', handleBackgroundClick);

export { showTitleMenuItem };
