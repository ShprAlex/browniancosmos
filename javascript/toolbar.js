import './about.js';
import { animate, getParam, resetApplication } from './app.js';
import { aboutModal, creditsModal } from './modals.js';
import { forceShowTitle, hideTitle } from './title.js';

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

function handleCanvasClick(event) {
    event.stopPropagation();
    if (toolbarEl.style.visibility === 'hidden') {
        show();
    } else {
        hide();
    }
}

function handleResetEnd() {
    if (getParam('description')) {
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
saveImageMenuItem.addEventListener('click', () => {
    const tempLink = document.createElement('a');
    tempLink.download = `BrownianCosmos${Math.floor(Date.now() / 1000) % 100000}.png`;
    tempLink.href = document.getElementById('canvas').toDataURL()
    tempLink.click();
    tempLink.remove();
});
showTitleMenuItem.addEventListener('click', () => { forceShowTitle(); hide(); });
reloadToobarButton.addEventListener('click', () => {
    hideTitle();
    resetApplication();
    animate();
});

fullscreenButton.addEventListener('click', handleFullscreen);

canvas.addEventListener('showmodal', hide);
canvas.addEventListener('hidemodal', show);
canvas.addEventListener('resetend', handleResetEnd);
canvas.addEventListener('click', handleCanvasClick);
scrollingDiv.addEventListener('click', handleCanvasClick);

export { showTitleMenuItem };
