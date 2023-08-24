
const aboutTitleEl = document.getElementById('aboutText');
const aboutTextEl = document.getElementById('aboutTitle');

function loadAboutText() {
    configurationId = params.get('configuration') || 'default';
    const configurationParams = getConfiguration(configurationId) || getConfiguration('default');
    aboutTextEl.innerHTML = configurationParams.name;
    aboutTitleEl.innerHTML = configurationParams.description;
}

window.addEventListener('load', () => {
    loadAboutText();
    aboutModal.show();
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
