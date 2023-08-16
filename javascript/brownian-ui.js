const fullscreenIcon = document.getElementById('fullscreenIcon');
const footerEl = document.getElementById('overlay');
const footerFieldset = document.getElementById('footerButtons');
const aboutModalEl = document.getElementById('aboutModal');

function showFooter() {
    footerEl.style.opacity = '1';
    footerEl.style.visibility = 'visible';
}

function hideFooter() {
    footerEl.style.opacity = '0';
    footerEl.style.visibility = 'hidden';
}

function handleShowModal() {
    scrollSpeed = 0.5;
    hideFooter();
}
function handleHideModal() {
    scrollSpeed = 2;
    showFooter();
}

fullscreenIcon.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        hideFooter();
    } else {
        document.exitFullscreen();
    }
});

canvas.addEventListener('click', function(e) {
    if (footerEl.style.visibility === 'hidden') {
        showFooter();
    } else {
        hideFooter();
    }
});

aboutModalEl.addEventListener('show.bs.modal', handleShowModal);
aboutModalEl.addEventListener('hide.bs.modal', handleHideModal);
