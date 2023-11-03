import { configuration, isWelcomeConfig, resetSettings } from './app.js';
import { getConfigurations } from './configurations.js';
import { aboutModal, modalVisible } from './modals.js';
import { finishedRendering, rendererProgress } from './renderer.js';
import { scrollLeft, scrollTop, scrollingDiv } from './scroller.js';
import { showTitleMenuItem } from './toolbar.js';

const applicationTitleEl = document.getElementById('applicationTitle');
const applicationTitleThirdLine = document.getElementById('applicationTitleThirdLine');
const applicationTitleStartButton = document.getElementById('applicationTitleStartButton');
const applicationTitleInfoButton = document.getElementById('applicationTitleInfoButton');

let titleState = null;
let titleTimeoutId = null;


function handleResetStart() {
    clearTimeout(titleTimeoutId);
    titleState = null;
    titleTimeoutId = null;
    if (!isWelcomeConfig()) {
        hide();
        applicationTitleStartButton.innerHTML = `
            Next <i class="fa-solid fa-chart-line"></i>
        `;
        applicationTitleInfoButton.style.display = 'initial';
    }
    else {
        show();
        applicationTitleStartButton.innerHTML = `
            Start <i class="fa-solid fa-rocket"></i>
        `;
        applicationTitleInfoButton.style.display = 'none';
    }
}

function show() {
    if (titleState === 'force-hidden') {
        return;
    }

    applicationTitleEl.style.opacity = 1;
    applicationTitleEl.style.visibility = 'visible';
    showTitleMenuItem.classList.add('disabled');
    applicationTitleThirdLine.style.display = 'initial';

    // change the title state after a delay so when scrolling shows it,
    // it's not immediately hidden by the same scrolling action.
    if (titleTimeoutId === null) {
        titleTimeoutId = setTimeout(
            () => {
                titleState = 'visible';
                titleTimeoutId = null;
            },
            1500
        );
    }
}

function forceShow() {
    applicationTitleEl.style.opacity = 1;
    applicationTitleEl.style.visibility = 'visible';
    titleState = 'force-visible';
    applicationTitleThirdLine.style.display = 'none';
    showTitleMenuItem.classList.add('disabled');
}

function hide() {
    applicationTitleEl.style.opacity = 0;
    applicationTitleEl.style.visibility = 'hidden';
    showTitleMenuItem.classList.remove('disabled');
}

function forceHide() {
    clearTimeout(titleTimeoutId);
    hide();
    titleState = 'force-hidden';
    showTitleMenuItem.classList.remove('disabled');
}

function updateAfterScroll() {
    const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
    if (
        (scrollingDiv.scrollLeft >= rightSide - 150)
        && !modalVisible
        && titleState === null
        && rendererProgress > 10 // don't show title immediately after reset
    ) {
        show();
    }
    else {
        // When they manually scroll, hide the title
        if (
            titleState === 'visible'
            && (scrollLeft != scrollingDiv.scrollLeft || scrollTop != scrollingDiv.scrollTop)
            && !isWelcomeConfig()
        ) {
            forceHide();
        }
    }
}

function handleShowModal() {
    hide();
}

function handleHideModal() {
    const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
    if (scrollingDiv.scrollLeft >= rightSide - 150 && finishedRendering) {
        show();
    }
}

function handleRenderingEnd() {
    if (window.innerWidth >= canvas.clientWidth && !modalVisible) {
        show();
    }
}

function loadNextConfiguration() {
    let previousConfiguration = configuration.id;
    const configurations = getConfigurations();
    for (const configurationId in configurations) {
        console.log(previousConfiguration, configurationId);
        if (previousConfiguration === null) {
            resetSettings({ configuration: configurationId });
            return;
        }
        if (previousConfiguration === configurationId) {
            previousConfiguration = null;
        }
    }
    resetSettings({ configuration: 'welcome' });
}


scrollingDiv.addEventListener('scrollend', updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchstart', updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchmove', updateAfterScroll, { passive: true });

canvas.addEventListener('renderingend', handleRenderingEnd);
canvas.addEventListener('click', () => {
    applicationTitleEl.style.visibility === 'visible' && forceHide();
});
canvas.addEventListener('resetstart', handleResetStart);

canvas.addEventListener('showmodal', handleShowModal);
canvas.addEventListener('hidemodal', handleHideModal);

applicationTitleStartButton.addEventListener('click', loadNextConfiguration);
applicationTitleInfoButton.addEventListener('click', (event) => { event.preventDefault(); aboutModal.show(); });

export {
    forceShow as forceShowTitle,
    hide as hideTitle
};
