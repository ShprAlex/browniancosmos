const fullscreenButton = document.getElementById('fullscreenButton');
const toolbarEl = document.getElementById('toolbar');
const chartInfoMenuItem = document.getElementById('chartInfoMenuItem');
const saveImageMenuItem = document.getElementById('saveImageMenuItem');
const showTitleMenuIcon = document.getElementById('showTitleMenuItem');
const reloadToobarButton = document.getElementById('reloadToolbarButton');
const additionalMenuDropdown = document.getElementById('additionalMenuDropdown');

class ToolbarHandler {
    static show() {
        toolbarEl.style.opacity = '1';
        toolbarEl.style.visibility = 'visible';
    }

    static hide() {
        toolbarEl.style.opacity = '0';
        toolbarEl.style.visibility = 'hidden';
    }

    static handleFullscreen(event) {
        event.stopPropagation();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    static handleCanvasClick(event) {
        event.stopPropagation();
        if (toolbarEl.style.visibility === 'hidden') {
            ToolbarHandler.show();
        } else {
            ToolbarHandler.hide();
        }
    }
}

window.addEventListener('load', () => {
    if (!document.fullscreenEnabled) {
        fullscreenButton.style.display = 'none';
        additionalMenuDropdown.style.padding = '0 max(12px, 0.9vw)';
    }
});

chartInfoMenuItem.addEventListener('click', (event) => { event.preventDefault(); aboutModal.show(); });
saveImageMenuItem.addEventListener('click', () => {
    const tempLink = document.createElement('a');
    tempLink.download = `BrownianCosmos${Math.floor(Date.now() / 1000) % 100000}.png`;
    tempLink.href = document.getElementById('canvas').toDataURL()
    tempLink.click();
    tempLink.remove();
});
showTitleMenuIcon.addEventListener('click', () => { ApplicationTitle.forceShow(); ToolbarHandler.hide(); });
reloadToobarButton.addEventListener('click', () => {
    ApplicationTitle.hide();
    AnimationHandler.reset();
    AnimationHandler.animate();
});

fullscreenButton.addEventListener('click', ToolbarHandler.handleFullscreen);

canvas.addEventListener('showmodal', ToolbarHandler.hide);
canvas.addEventListener('hidemodal', ToolbarHandler.show);
canvas.addEventListener('click', ToolbarHandler.handleCanvasClick);
scrollingDiv.addEventListener('click', ToolbarHandler.handleCanvasClick);
