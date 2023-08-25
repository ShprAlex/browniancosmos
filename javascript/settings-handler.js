const settingsModal = new bootstrap.Modal(settingsModalEl);
const settingsForm = document.getElementById('settingsForm');
const applySettingsButton = document.getElementById('applySettingsButton');
const customSettingsSelectEl = document.getElementById('customSettingsSelect');
const settingsMenuItems = document.getElementById('settingsMenuItems');

window.addEventListener('load', () => { loadSettingsMenu(); loadCustomSettingsSelect(); });

function resetAnimationSettings(settingsData) {
    // params is defined in animation-handler.js.
    // Setting params here lets us avoid reloading.
    // after animate() is called, params is internally parsed to extract the parameters.
    params = new URLSearchParams(settingsData);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `launch.html?${params.toString()}`);
    AnimationHandler.reset();
    AnimationHandler.animate();
    if ('configuration' in settingsData) {
        aboutModal.show();
    }
}

function showSettingsModal() {
    settingsForm.elements['height'].value = canvas.height;
    settingsForm.elements['width'].value = canvas.width;
    settingsForm.elements['particles'].value = MAX_PARTICLES;
    settingsForm.elements['startw'].value = START_WAVELENGTH;
    settingsForm.elements['endw'].value = END_WAVELENGTH;
    settingsForm.elements['cellsize'].value = CELL_SIZE;
    settingsForm.elements['velocity'].value = BROWNIAN_VELOCITY;
    settingsForm.elements['waveshape'].value = WAVE_SHAPE;
    settingsModal.show();
}

function loadSettingsMenu() {
    const menuItemHtml = (id, name) => `
        <li><a class='dropdown-item' data-value='${id}' href='#'>${name}</a></li>
    `;
    for (const [option, data] of Object.entries(getConfigurations())) {
        settingsMenuItems.innerHTML += menuItemHtml(option, data.name);
    }
    settingsMenuItems.innerHTML += menuItemHtml('custom', 'Custom');

    Array.from(settingsMenuItems.children).forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const option = event.target.getAttribute('data-value');
            if (option === 'custom') {
                showSettingsModal();
            }
            else {
                resetAnimationSettings({ configuration: option });
            }
        });
    });
}

function loadCustomSettingsSelect() {
    const customSettingsOptionHtml = (id, name) => `<option value='${id}'>${name}</option>`;
    customSettingsSelectEl.innerHTML += customSettingsOptionHtml('custom', 'Custom');

    for (const [option, data] of Object.entries(getConfigurations())) {
        customSettingsSelectEl.innerHTML += customSettingsOptionHtml(option, data.name);
    }

    customSettingsSelectEl.addEventListener('change', (event) => {
        const configuration = getConfiguration(event.target.value);
        if (configuration) {
            for (const [key, value] of Object.entries(configuration)) {
                if (key in settingsForm.elements) {
                    settingsForm.elements[key].value = value;
                }
            }
        }
    });
}

settingsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    settingsModal.hide();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    resetAnimationSettings(formDataObj);
});