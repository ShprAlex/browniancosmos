let modalVisible = false;
const fullscreenIcon = document.getElementById('fullscreenIcon');
const footerEl = document.getElementById('footer');
const footerFieldset = document.getElementById('footerButtons');
const aboutModalEl = document.getElementById('aboutModal');
const aboutModal = new bootstrap.Modal(aboutModalEl);
const settingsModalEl = document.getElementById('settingsModal');
const settingsModal = new bootstrap.Modal(settingsModalEl);
const settingsForm = document.getElementById('settingsForm');
const aboutFooterButton = document.getElementById('aboutFooterButton');
const settingsFooterButton = document.getElementById('settingsFooterButton');
const applySettingsButton = document.getElementById('applySettingsButton');

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
    modalVisible = true;

    if (applicationTitleEl.style.opacity > '0') {
        applicationTitleEl.style.opacity = '0';
        hideApplicationTitleCount = 60; // don't show title again
    }
    hideFooter();
}
function handleHideModal() {
    modalVisible = false;
    scrollSpeed = 2;
    showFooter();
    updateApplicationTitle();
}

aboutFooterButton.addEventListener('click', function() { aboutModal.show(); });

settingsFooterButton.addEventListener('click', function() {
    settingsForm.elements["height"].value = canvas.height;
    settingsForm.elements["width"].value = canvas.width;
    settingsModal.show();
});

settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    settingsModal.hide();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    // params is defined in animate-brownian.js setting it here lets us avoid reloading.
    params = new URLSearchParams(formDataObj);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `launch.html?${params.toString()}`);
    finishedRendering = true;
    finishedScrolling = true;
    reset();
    animate();
});

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
settingsModalEl.addEventListener('show.bs.modal', handleShowModal);
settingsModalEl.addEventListener('hide.bs.modal', handleHideModal);
