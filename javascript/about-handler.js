
const aboutTitleEl = document.getElementById('aboutTitle');
const aboutTextEl = document.getElementById('aboutText');

function loadAboutText() {
    configurationId = params.get('configuration') || 'default';
    const configurationParams = getConfiguration(configurationId) || getConfiguration('default');
    aboutTitleEl.innerHTML = configurationParams.name;
    aboutTextEl.innerHTML = configurationParams.description;
}

window.addEventListener('load', () => {
    loadAboutText();
    aboutModal.show();
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
