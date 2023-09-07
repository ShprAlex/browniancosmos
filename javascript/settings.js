import {
    BROWNIAN_VELOCITY,
    CELL_SIZE,
    END_WAVELENGTH,
    MAX_PARTICLES,
    PALETTE,
    START_WAVELENGTH,
    WAVEFORM,
    animate,
    getParam,
    resetApplication
} from './app.js';
import { getConfiguration, getConfigurations } from './configurations.js';
import { aboutModal, settingsModal } from './modals.js';

const settingsForm = document.getElementById('settingsForm');
const applySettingsButton = document.getElementById('applySettingsButton');
const configurationSelectEl = document.getElementById('configurationSelect');
const settingsMenuItems = document.getElementById('settingsMenuItems');

window.addEventListener('load', () => { loadSettingsMenu(); loadConfigurationSelect(); });

function resetAnimationSettings(settingsData) {
    // params is defined in animation-handler.js.
    // Setting params here lets us avoid reloading.
    // after animate() is called, params is internally parsed to extract the parameters.
    const urlParams = new URLSearchParams(settingsData);
    // update the url without reloading.
    history.pushState({}, 'BrownianCosmos', `index.html?${urlParams.toString()}`);
    resetApplication();
    animate();
    if ('configuration' in settingsData && settingsData['configuration']!='welcome') {
        aboutModal.show();
    }
}

function showSettingsModal() {
    settingsForm.elements['configurationSelect'].value = getParam('configuration') || 'custom';
    settingsForm.elements['height'].value = canvas.height;
    settingsForm.elements['width'].value = canvas.width;
    settingsForm.elements['particles'].value = MAX_PARTICLES;
    settingsForm.elements['startw'].value = START_WAVELENGTH;
    settingsForm.elements['endw'].value = END_WAVELENGTH;
    settingsForm.elements['cellsize'].value = CELL_SIZE;
    settingsForm.elements['velocity'].value = BROWNIAN_VELOCITY;
    settingsForm.elements['waveform'].value = WAVEFORM;
    settingsForm.elements['palette'].value = PALETTE;
    settingsModal.show();
}

function loadSettingsMenu() {
    const menuItemHtml = (id, name) => `
        <li><a class='dropdown-item' data-value='${id}' href='#'>${name}</a></li>
    `;
    for (const [option, data] of Object.entries(getConfigurations())) {
        if (option != 'default') {
            settingsMenuItems.innerHTML += menuItemHtml(option, data.name);
        }
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

function loadConfigurationSelect() {
    const customSettingsOptionHtml = (id, name) => `<option value='${id}'>${name}</option>`;
    configurationSelectEl.innerHTML += customSettingsOptionHtml('custom', 'Custom');

    for (const [option, data] of Object.entries(getConfigurations())) {
        if (option != 'default') {
            configurationSelectEl.innerHTML += customSettingsOptionHtml(option, data.name);
        }
    }

    configurationSelectEl.addEventListener('change', (event) => {
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