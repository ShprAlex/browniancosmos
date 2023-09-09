import { configuration, isCustomConfig, isWelcomeConfig } from './app.js';
import { aboutModal, aboutModalEl } from './modals.js';

const aboutTitleEl = document.getElementById('aboutTitle');
const aboutTextEl = document.getElementById('aboutText');

function loadAboutText() {
    aboutTitleEl.innerHTML = configuration.name;
    aboutTextEl.innerHTML = configuration.description;
}

window.addEventListener('load', () => {
    setTimeout(
        () => {
            loadAboutText();
            if (!isWelcomeConfig() && !isCustomConfig()) {
                aboutModal.show();
            }
        },
        100,
    )
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
