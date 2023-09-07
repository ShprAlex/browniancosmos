"use strict";

const scrollingDiv = document.getElementById('scrollingDiv');

let scrollSpeed;
let scrollLeft;
let scrollTop;
let startedScrolling;
let finishedScrolling;

class Scroller {
    static initialize() {
        scrollingDiv.addEventListener('scrollend', Scroller.updateAutoScroll, { passive: true });
        scrollingDiv.addEventListener('touchstart', Scroller.updateAutoScroll, { passive: true });
        scrollingDiv.addEventListener('touchmove', Scroller.updateAutoScroll, { passive: true });
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

    static reset() {
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

    static updateAutoScroll() {
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

    static getProgressPercent() {
        if (!finishedScrolling) {
            const scrollWidth = canvas.clientWidth - scrollingDiv.offsetWidth;
            return Math.ceil(scrollingDiv.scrollLeft / scrollWidth * 100);
        }
        return 100;
    }

    static scroll() {
        if (Math.abs(scrollLeft - scrollingDiv.scrollLeft) > scrollSpeed || Math.abs(scrollTop - scrollingDiv.scrollTop) > scrollSpeed) {
            scrollLeft = scrollingDiv.scrollLeft;
            scrollTop = scrollingDiv.scrollTop;
        }

        const shortImageFactor = canvas.width / canvas.clientWidth;
        // check if we've rendered past the right side of the screen
        if (progress > window.innerWidth / CELL_SIZE * shortImageFactor) {
            if (!startedScrolling) {
                // extra boost at the start so that autoscroll stop detection doesn't trigger
                scrollLeft += scrollSpeed * 5;
            }
            startedScrolling = true;
            scrollLeft += scrollSpeed;
            scrollLeft = Math.min(scrollLeft, canvas.clientWidth - scrollingDiv.offsetWidth);
            // When starting waves are small, start scrolling up a quarter of the way through the animation.
            // Don't scroll up if the canvas height is only a little bigger than the window height.
            if ((scrollLeft > canvas.clientWidth / 4 || !RAMP_UP_PARTICLES) && canvas.clientHeight > window.innerHeight * 1.2) {
                const distLeft = Math.max(0.01, canvas.clientWidth - scrollingDiv.offsetWidth - scrollLeft);
                scrollTop -= Math.min(1, scrollTop / distLeft) * scrollSpeed;
                scrollTop = Math.max(0, scrollTop);
            }

            scrollingDiv.scrollLeft = scrollLeft;
            scrollingDiv.scrollTop = scrollTop;
        }
    }
}
