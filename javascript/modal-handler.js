"use strict";

let modalVisible;
const aboutModalEl = document.getElementById('aboutModal');
const aboutModal = new bootstrap.Modal(aboutModalEl);
const settingsModalEl = document.getElementById('settingsModal');
const settingsModal = new bootstrap.Modal(settingsModalEl);
const creditsModalEl = document.getElementById('creditsModal');
const creditsModal = new bootstrap.Modal(creditsModalEl);

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
creditsModalEl.addEventListener('show.bs.modal', ModalHandler.show);
creditsModalEl.addEventListener('hide.bs.modal', ModalHandler.hide);
