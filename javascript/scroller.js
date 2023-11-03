import { CELL_SIZE, RAMP_UP_PARTICLES, isWelcomeConfig } from './app.js';
import { rendererProgress } from './renderer.js';

const scrollingDiv = document.getElementById('scrollingDiv');

let scrollSpeed;
let scrollLeft;
let scrollTop;
let startedScrolling;
let finishedScrolling;

function initialize() {
    scrollingDiv.addEventListener('scrollend', updateAutoScroll, { passive: true });
    scrollingDiv.addEventListener('touchstart', updateAutoScroll, { passive: true });
    scrollingDiv.addEventListener('touchmove', updateAutoScroll, { passive: true });
    canvas.addEventListener('showmodal', () => { scrollSpeed = 0.5; });
    canvas.addEventListener('hidemodal', () => {
        if (isWelcomeConfig()) {
            scrollSpeed = 0.5;
        }
        else {
            scrollSpeed = 2;
        }
    });
}

function reset() {
    if (isWelcomeConfig()) {
        scrollSpeed = 0.5;
    }
    else {
        scrollSpeed = 2;
    }
    startedScrolling = false;
    finishedScrolling = false;

    scrollLeft = 0;
    scrollTop = canvas.clientHeight - scrollingDiv.offsetHeight;
    scrollingDiv.scrollLeft = scrollLeft;
    scrollingDiv.scrollTop = scrollTop;

    if (canvas.clientWidth <= window.innerWidth) {
        finishedScrolling = true;
    }
}

function updateAutoScroll() {
    const leftSide = scrollSpeed;
    const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
    if (
        startedScrolling
        && !finishedScrolling
        && (scrollLeft <= leftSide || scrollLeft >= rightSide)
    ) {
        scrollLeft = scrollingDiv.scrollLeft;
        scrollTop = scrollingDiv.scrollTop;
        finishedScrolling = true;
    }
}

function getProgressPercent() {
    if (!finishedScrolling) {
        const scrollWidth = canvas.clientWidth - scrollingDiv.offsetWidth;
        return Math.ceil(scrollingDiv.scrollLeft / scrollWidth * 100);
    }
    return 100;
}

function scroll() {
    if (Math.abs(scrollLeft - scrollingDiv.scrollLeft) > scrollSpeed || Math.abs(scrollTop - scrollingDiv.scrollTop) > scrollSpeed) {
        scrollLeft = scrollingDiv.scrollLeft;
        scrollTop = scrollingDiv.scrollTop;
    }

    const shortImageFactor = canvas.width / canvas.clientWidth;
    // check if we've rendered past the right side of the screen
    if (rendererProgress > window.innerWidth / CELL_SIZE * shortImageFactor) {
        if (!startedScrolling) {
            // extra boost at the start so that autoscroll stop detection doesn't trigger
            scrollLeft += scrollSpeed * 5;
        }
        startedScrolling = true;
        scrollLeft += scrollSpeed;
        scrollLeft = Math.min(scrollLeft, canvas.clientWidth - scrollingDiv.offsetWidth);
        // When starting waves are small, start scrolling up a quarter of the way through the animation.
        // Don't scroll up if the canvas height is only a little bigger than the window height.
        if ((scrollLeft > canvas.clientWidth / 5 || !RAMP_UP_PARTICLES) && canvas.clientHeight > window.innerHeight * 1.2) {
            const distLeft = Math.max(0.01, canvas.clientWidth - scrollingDiv.offsetWidth - scrollLeft);
            scrollTop -= Math.min(1, scrollTop / distLeft) * scrollSpeed;
            scrollTop = Math.max(0, scrollTop);
        }

        scrollingDiv.scrollLeft = scrollLeft;
        scrollingDiv.scrollTop = scrollTop;
    }
}

export {
    finishedScrolling,
    getProgressPercent as getScrollerProgressPercent,
    initialize as initializeScroller,
    reset as resetScroller,
    scroll,
    scrollLeft,
    scrollTop,
    scrollingDiv
};

