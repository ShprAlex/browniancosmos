let modalVisible;
const aboutModalEl = document.getElementById('aboutModal');
const aboutModal = new bootstrap.Modal(aboutModalEl);
const settingsModalEl = document.getElementById('settingsModal');
const settingsModal = new bootstrap.Modal(settingsModalEl);
const creditsModalEl = document.getElementById('creditsModal');
const creditsModal = new bootstrap.Modal(creditsModalEl);

function show() {
    modalVisible = true;
    canvas.dispatchEvent(new CustomEvent('showmodal', { bubbles: true }));
}
function hide() {
    modalVisible = false;
    canvas.dispatchEvent(new CustomEvent('hidemodal', { bubbles: true }));
}

aboutModalEl.addEventListener('show.bs.modal', show);
aboutModalEl.addEventListener('hide.bs.modal', hide);
settingsModalEl.addEventListener('show.bs.modal', show);
settingsModalEl.addEventListener('hide.bs.modal', hide);
creditsModalEl.addEventListener('show.bs.modal', show);
creditsModalEl.addEventListener('hide.bs.modal', hide);

export {
    aboutModal,
    aboutModalEl,
    creditsModal,
    modalVisible,
    settingsModal
};

