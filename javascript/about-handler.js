
const aboutTitleEl = document.getElementById('aboutTitle');
const aboutTextEl = document.getElementById('aboutText');

function loadAboutText() {
    const urlParams = new URLSearchParams(window.location.search);
    configurationId = urlParams.get('configuration') || 'default';
    const configurationParams = getConfiguration(configurationId) || getConfiguration('default');
    aboutTitleEl.innerHTML = configurationParams.name;
    aboutTextEl.innerHTML = configurationParams.description;
}

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size ===0 || urlParams.get('configuration')) {
        loadAboutText();
        aboutModal.show();
    }
});

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
