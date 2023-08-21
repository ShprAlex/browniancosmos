const fullscreenIcon = document.getElementById('fullscreenIcon');
const toolbarEl = document.getElementById('toolbar');
const aboutToolbarButton = document.getElementById('aboutToolbarButton');

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

fullscreenIcon.addEventListener('click', ToolbarHandler.handleFullscreen);

canvas.addEventListener('showmodal', ToolbarHandler.hide);
canvas.addEventListener('hidemodal', ToolbarHandler.show);
canvas.addEventListener('click', ToolbarHandler.handleCanvasClick);
