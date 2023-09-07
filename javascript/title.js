import { isWelcomeConfig } from './app.js';
import { modalVisible } from './modals.js';
import { finishedRendering, rendererProgress } from './renderer.js';
import { scrollLeft, scrollTop, scrollingDiv } from './scroller.js';
import { showTitleMenuItem } from './toolbar.js';

const applicationTitleEl = document.getElementById('applicationTitle');
const applicationTitleThirdLine = document.getElementById('applicationTitleThirdLine');
let titleState = null;
let titleTimeoutId = null;


function handleResetStart() {
    clearTimeout(titleTimeoutId);
    titleState = null;
    titleTimeoutId = null;
    if (!isWelcomeConfig()) {
        hide();
        applicationTitleThirdLine.style.display = 'none';
        applicationTitleThirdLine.innerHTML = `
            <i class="fa-solid fa-arrows-up-down-left-right"></i>
            <br />
            Scroll to see more
        `;
    }
    else {
        show();
        applicationTitleThirdLine.style.display = 'inherit';
        applicationTitleThirdLine.innerHTML = `
            <i class="fa-solid fa-line-chart"></i>
            <br />
            Welcome! Please see the charts menu for more.
        `;
    }
}

function handleResetEnd() {
    setTimeout(
        () => {
            if (canvas.width * canvas.height < 2000 * 2000 && !isWelcomeConfig()) {
                applicationTitleThirdLine.style.display = 'none';
            }
            else {
                applicationTitleThirdLine.style.display = 'inherit';
            };
        },
        1000
    )
}

function show() {
    if (titleState === 'force-hidden') {
        return;
    }

    applicationTitleEl.style.opacity = 1;
    applicationTitleEl.style.visibility = 'visible';
    showTitleMenuItem.classList.add('disabled');

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
    if (!['visible', 'force-visible'].includes(titleState)) {
        return;
    }
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


scrollingDiv.addEventListener('scrollend', updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchstart', updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchmove', updateAfterScroll, { passive: true });

canvas.addEventListener('renderingend', handleRenderingEnd);
canvas.addEventListener('click', forceHide);
canvas.addEventListener('resetstart', handleResetStart);
canvas.addEventListener('resetend', handleResetEnd);

canvas.addEventListener('showmodal', handleShowModal);
canvas.addEventListener('hidemodal', handleHideModal);

export { forceShow as forceShowTitle, hide as hideTitle };
