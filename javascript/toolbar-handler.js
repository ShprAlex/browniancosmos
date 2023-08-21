const fullscreenIcon = document.getElementById('fullscreenIcon');
const footerEl = document.getElementById('footer');
const aboutFooterButton = document.getElementById('aboutFooterButton');

window.addEventListener('load', ()=>{aboutModal.show(); });

class ToolbarHandler {
    static show() {
        footerEl.style.opacity = '1';
        footerEl.style.visibility = 'visible';
    }
    
    static hide() {
        footerEl.style.opacity = '0';
        footerEl.style.visibility = 'hidden';
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
        if (footerEl.style.visibility==='hidden') {
            ToolbarHandler.show();
        } else {
            ToolbarHandler.hide();
        }
    }
}

aboutFooterButton.addEventListener('click', () => { aboutModal.show(); });

fullscreenIcon.addEventListener('click', ToolbarHandler.handleFullscreen);

canvas.addEventListener('showmodal', ToolbarHandler.hide);
canvas.addEventListener('hidemodal', ToolbarHandler.show);
canvas.addEventListener('click', ToolbarHandler.handleCanvasClick);
