"use strict";

const aboutTitleEl = document.getElementById('aboutTitle');
const aboutTextEl = document.getElementById('aboutText');

function loadAboutText() {
    const configurationId = params.get('configuration') || 'welcome';
    const configurationParams = getConfiguration(configurationId) || getConfiguration('welcome');
    aboutTitleEl.innerHTML = configurationParams.name;
    aboutTextEl.innerHTML = configurationParams.description;
}

window.addEventListener('load', () => {
    loadAboutText();
    if (!isWelcomeConfig() && !isDefaultConfig() && params.get('configuration')) {
        aboutModal.show();
    }
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
