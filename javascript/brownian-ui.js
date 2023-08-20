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
const applySettingsButton = document.getElementById('applySettingsButton');
const selectPresetEl = document.getElementById("selectPreset");
const settingsMenuItems = document.querySelectorAll('#settingsMenuItems .dropdown-item');

window.addEventListener('load', ()=>{aboutModal.show()});

settingsMenuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const option = event.target.getAttribute('data-value');
        if (option === "custom") {
            showSettingsModal();
        }
        else {
            resetAnimation({configuration: option});
        }
    });
});

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
    showApplicationTitle(false);
    showFooter(false);
}
function handleHideModal() {
    modalVisible = false;
    scrollSpeed = 2;
    showFooter(true);
    updateApplicationTitle();
}

function resetAnimation(settingsData) {
    // params is defined in animate-brownian.js.
    // Setting params here lets us avoid reloading.
    // after animate() is called, params is internally parsed to extract the parameters.
    params = new URLSearchParams(settingsData);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `launch.html?${params.toString()}`);
    showApplicationTitle(false);
    finishedRendering = true;
    finishedScrolling = true;
    setTimeout(()=>{reset(); animate(); aboutModal.show();}, 200); // give the previous animation time to stop
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

settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    settingsModal.hide();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    resetAnimation(formDataObj);
});

selectPresetEl.addEventListener("change", (event) => {
    const configuration = getConfiguration(event.target.value);
    if (configuration) {
        for (const [key, value] of Object.entries(configuration)) {
            if (key in settingsForm.elements) {
                settingsForm.elements[key].value = value;
            }
        }
    }
});

fullscreenIcon.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        showFooter(false);
        showApplicationTitle(false);
    } else {
        document.exitFullscreen();
    }
});

canvas.addEventListener('click', function(e) {
    if (footerEl.style.visibility==='hidden') {
        showFooter(true);
    } else {
        showFooter(false);
        showApplicationTitle(false);
    }
});

aboutModalEl.addEventListener('show.bs.modal', handleShowModal);
aboutModalEl.addEventListener('hide.bs.modal', handleHideModal);
settingsModalEl.addEventListener('show.bs.modal', handleShowModal);
settingsModalEl.addEventListener('hide.bs.modal', handleHideModal);
