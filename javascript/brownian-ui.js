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
const selectPresetEl = document.getElementById("selectPreset");
const settingsMenuItems = document.querySelectorAll('#settingsMenuItems .dropdown-item');

settingsMenuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const option = event.target.getAttribute('data-value');
        console.log('Value:', event.target.getAttribute('data-value'));
        if (option === "custom") {
            showSettingsModal();
        }
        presets = getPresets(option);
        if (presets) {
            resetAnimation(presets);
        }
    });
});

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

function resetAnimation(settingsData) {
    // params is defined in animate-brownian.js setting it here lets us avoid reloading.
    // after animate() is called, params is internally parsed to extract the parameters.
    params = new URLSearchParams(settingsData);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `launch.html?${params.toString()}`);
    applicationTitleEl.style.opacity = 0;
    finishedRendering = true;
    finishedScrolling = true;
    setTimeout(()=>{reset(); animate();}, 200); // give the previous animation time to stop
}

function showSettingsModal() {
    settingsForm.elements["height"].value = canvas.height;
    settingsForm.elements["width"].value = canvas.width;
    settingsForm.elements["particles"].value = MAX_PARTICLES;
    settingsForm.elements["startw"].value = START_WAVELENGTH;
    settingsForm.elements["endw"].value = END_WAVELENGTH;
    settingsForm.elements["cellsize"].value = CELL_SIZE;
    settingsForm.elements["velocity"].value = BROWNIAN_VELOCITY;
    settingsModal.show();
}

aboutFooterButton.addEventListener('click', function() { aboutModal.show(); });

settingsFooterButton.addEventListener('click', function() { showSettingsModal(); });

settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    settingsModal.hide();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    resetAnimation(formDataObj);
});

selectPresetEl.addEventListener("change", (event) => {
    const presets = getPresets(event.target.value);
    if (presets) {
        for (const [key, value] of Object.entries(presets)) {
            settingsForm.elements[key].value = value;
        }
    }
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
