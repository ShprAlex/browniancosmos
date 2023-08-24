let modalVisible;
const aboutModalEl = document.getElementById('aboutModal');
const aboutModal = new bootstrap.Modal(aboutModalEl);
const settingsModalEl = document.getElementById('settingsModal');

window.addEventListener('load', () => { aboutModal.show(); });

class ModalHandler {
    static show() {
        modalVisible = true;
        canvas.dispatchEvent(new CustomEvent('showmodal', { bubbles: true }));
    }
    static hide() {
        modalVisible = false;
        canvas.dispatchEvent(new CustomEvent('hidemodal', { bubbles: true }));
    }
}

aboutModalEl.addEventListener('show.bs.modal', ModalHandler.show);
aboutModalEl.addEventListener('hide.bs.modal', ModalHandler.hide);
settingsModalEl.addEventListener('show.bs.modal', ModalHandler.show);
settingsModalEl.addEventListener('hide.bs.modal', ModalHandler.hide);
