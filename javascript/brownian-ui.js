let modalVisible = false;
const fullscreenIcon = document.getElementById('fullscreenIcon');
const footerEl = document.getElementById('footer');
const footerFieldset = document.getElementById('footerButtons');
const aboutModalEl = document.getElementById('aboutModal');
const aboutModal = new bootstrap.Modal(aboutModalEl);
const settingsModalEl = document.getElementById('settingsModal');
const aboutFooterButton = document.getElementById('aboutFooterButton');

window.addEventListener('load', ()=>{aboutModal.show(); });

function showFooter(show) {
    if (show) {
        footerEl.style.opacity = '1';
        footerEl.style.visibility = 'visible';
    }
    else {
        footerEl.style.opacity = '0';
        footerEl.style.visibility = 'hidden';
    }
}

function handleShowModal() {
    scrollSpeed = 0.5;
    modalVisible = true;
    showFooter(false);
}

function handleHideModal() {
    modalVisible = false;
    scrollSpeed = 2;
    showFooter(true);
}

aboutFooterButton.addEventListener('click', function() { aboutModal.show(); });

fullscreenIcon.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        showFooter(false);
    } else {
        document.exitFullscreen();
    }
});

canvas.addEventListener('click', function(e) {
    if (footerEl.style.visibility==='hidden') {
        showFooter(true);
    } else {
        showFooter(false);
    }
});

aboutModalEl.addEventListener('show.bs.modal', handleShowModal);
aboutModalEl.addEventListener('hide.bs.modal', handleHideModal);
settingsModalEl.addEventListener('show.bs.modal', handleShowModal);
settingsModalEl.addEventListener('hide.bs.modal', handleHideModal);
