import {
    configuration,
    resetSettings
} from './app.js';
import { getConfiguration, getConfigurations } from './configurations.js';
import { settingsModal } from './modals.js';

const settingsForm = document.getElementById('settingsForm');
const configurationSelectEl = document.getElementById('configurationSelect');
const settingsMenuItems = document.getElementById('settingsMenuItems');

window.addEventListener('load', () => { loadSettingsMenu(); loadConfigurationSelect(); });

function showSettingsModal() {
    for (const [key, value] of Object.entries(configuration)) {
        if (key in settingsForm.elements) {
            settingsForm.elements[key].value = value;
        }
    };
    settingsForm.elements['configurationSelect'].value = configuration.id;
    settingsModal.show();
}

function loadSettingsMenu() {
    const menuItemHtml = (id, name) => `
        <li><a class='dropdown-item' data-value='${id}' href='#'>${name}</a></li>
    `;
    for (const [configurationId, configuration] of Object.entries(getConfigurations())) {
        if (configurationId != 'default') {
            settingsMenuItems.innerHTML += menuItemHtml(configurationId, configuration.name);
        }
    }
    settingsMenuItems.innerHTML += menuItemHtml('custom', 'Custom');

    Array.from(settingsMenuItems.children).forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const configurationId = event.target.getAttribute('data-value');
            if (configurationId === 'custom') {
                showSettingsModal();
            }
            else {
                resetSettings({ configuration: configurationId });
            }
        });
    });
}

function loadConfigurationSelect() {
    const customSettingsOptionHtml = (id, name) => `<option value='${id}'>${name}</option>`;
    configurationSelectEl.innerHTML += customSettingsOptionHtml('custom', 'Custom');

    for (const [configurationId, configuration] of Object.entries(getConfigurations())) {
        if (configurationId != 'default') {
            configurationSelectEl.innerHTML += customSettingsOptionHtml(
                configurationId, configuration.name
            );
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
    resetSettings(formDataObj);
});
