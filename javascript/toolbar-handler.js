const fullscreenButton = document.getElementById('fullscreenButton');
const toolbarEl = document.getElementById('toolbar');
const aboutToolbarButton = document.getElementById('aboutToolbarButton');
const reloadToobarButton = document.getElementById('reloadToolbarButton');

window.addEventListener('load', ()=>{aboutModal.show(); });

class ToolbarHandler {
    static show() {
        toolbarEl.style.opacity = '1';
        toolbarEl.style.visibility = 'visible';
    }
    
    static hide() {
        toolbarEl.style.opacity = '0';
        toolbarEl.style.visibility = 'hidden';
    }

    static handleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            ToolbarHandler.hide();
        } else {
            document.exitFullscreen();
        }
    }

    static handleCanvasClick() {
        if (toolbarEl.style.visibility==='hidden') {
            ToolbarHandler.show();
        } else {
            ToolbarHandler.hide();
        }
    }
}

aboutToolbarButton.addEventListener('click', () => { aboutModal.show(); });
reloadToobarButton.addEventListener('click', () => { ApplicationTitle.hide(); AnimationHandler.reset(); AnimationHandler.animate();});

fullscreenButton.addEventListener('click', ToolbarHandler.handleFullscreen);

canvas.addEventListener('showmodal', ToolbarHandler.hide);
canvas.addEventListener('hidemodal', ToolbarHandler.show);
canvas.addEventListener('click', ToolbarHandler.handleCanvasClick);
