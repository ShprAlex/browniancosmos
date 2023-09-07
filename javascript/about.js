import { getConfigurationId, isDefaultConfig, isWelcomeConfig } from './app.js';
import { getConfiguration } from './configurations.js';
import { aboutModal, aboutModalEl } from './modals.js';

const aboutTitleEl = document.getElementById('aboutTitle');
const aboutTextEl = document.getElementById('aboutText');

function loadAboutText() {
    const configuration = getConfiguration(getConfigurationId());
    aboutTitleEl.innerHTML = configuration.name;
    aboutTextEl.innerHTML = configuration.description;
}

window.addEventListener('load', () => {
    setTimeout(
        () => {
            loadAboutText();
            if (
                !isWelcomeConfig()
                && !isDefaultConfig()
                && getConfigurationId()
                && getConfiguration(getConfigurationId())
            ) {
                aboutModal.show();
            }
        },
        100,
    )
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
