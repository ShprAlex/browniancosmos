
const aboutTitleEl = document.getElementById('aboutText');
const aboutTextEl = document.getElementById('aboutTitle');

window.addEventListener('load', loadAboutText);

function loadAboutText() {
    configurationId = params.get("configuration") || "default";
    const configurationParams = getConfiguration(configurationId) || getConfiguration("default");
    aboutTextEl.innerHTML = configurationParams.name;
    aboutTitleEl.innerHTML = configurationParams.description;
}

aboutModalEl.addEventListener('show.bs.modal', loadAboutText);
