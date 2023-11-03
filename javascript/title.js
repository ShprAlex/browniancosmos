import { configuration, isWelcomeConfig, resetSettings } from './app.js';
import { getConfigurations } from './configurations.js';
import { aboutModal, modalVisible } from './modals.js';
import { finishedRendering, rendererProgress } from './renderer.js';
import { scrollLeft, scrollTop, scrollingDiv } from './scroller.js';

const applicationTitleEl = document.getElementById('applicationTitle');
const applicationTitleThirdLine = document.getElementById('applicationTitleThirdLine');
const applicationTitleNextButton = document.getElementById('applicationTitleNextButton');
const applicationTitleInfoButton = document.getElementById('applicationTitleInfoButton');

let titleState = null;
let titleTimeoutId = null;


function handleResetStart() {
    clearTimeout(titleTimeoutId);
    titleState = null;
    titleTimeoutId = null;
    if (!isWelcomeConfig()) {
        hide();
        applicationTitleNextButton.innerHTML = `
            Next <i class="fa-solid fa-chart-line"></i>
        `;
        applicationTitleInfoButton.style.display = 'initial';
    }
    else {
        show();
        applicationTitleNextButton.innerHTML = `
            Start <i class="fa-solid fa-rocket"></i>
        `;
        applicationTitleInfoButton.style.display = 'none';
    }
}

function show() {
    applicationTitleEl.style.opacity = 1;
    applicationTitleEl.style.visibility = 'visible';
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
}

function hide() {
    applicationTitleEl.style.opacity = 0;
    applicationTitleEl.style.visibility = 'hidden';
    titleState = 'hidden';
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
            hide();
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

function loadNextConfiguration(event) {
    event.stopPropagation();
    let previousConfiguration = configuration.id;
    const configurations = getConfigurations();
    for (const configurationId in configurations) {
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
canvas.addEventListener('click', hide);
canvas.addEventListener('resetstart', handleResetStart);

canvas.addEventListener('showmodal', handleShowModal);
canvas.addEventListener('hidemodal', handleHideModal);

applicationTitleNextButton.addEventListener('click', loadNextConfiguration);
applicationTitleInfoButton.addEventListener('click', (event) => { event.preventDefault(); aboutModal.show(); });

export {
    forceShow as forceShowTitle,
    hide as hideTitle,
    show as showTitle
};
