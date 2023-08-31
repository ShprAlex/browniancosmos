const applicationTitleEl = document.getElementById('applicationTitle');
const scrollToSeeMore = document.getElementById('applicationTitleScrollForMore');
let titleState = null;
let titleTimeoutId = null;

class ApplicationTitle {
    static reset() {
        ApplicationTitle.hide();
        clearTimeout(titleTimeoutId);
        titleState = null;
        titleTimeoutId = null;
        scrollToSeeMore.style.display = 'none';
    }

    static show() {
        if (titleState !== 'manually-hidden') {
            applicationTitleEl.style.opacity = 1;
            applicationTitleEl.style.visibility = 'visible';
        }
        // change the title state after a delay so when scrolling shows it,
        // it's not immediately hidden by the same scrolling action.
        if (titleTimeoutId === null) {
            titleTimeoutId = setTimeout(
                () => {
                    titleState = 'visible';
                    titleTimeoutId = null;
                },
                2000
            );
        }
    }

    static hide() {
        applicationTitleEl.style.opacity = 0;
        applicationTitleEl.style.visibility = 'hidden';
    }

    static hideUntilReset() {
        if (titleState === 'visible') {
            ApplicationTitle.hide();
            titleState = 'manually-hidden';
        }
    }

    static updateAfterScroll() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (
            (scrollingDiv.scrollLeft >= rightSide - 150)
            && !modalVisible
            && titleState === null
        ) {
            ApplicationTitle.show();
        }
        else {
            // When they manually scroll, hide the title
            if (
                titleState === 'visible'
                && (scrollLeft != scrollingDiv.scrollLeft || scrollTop != scrollingDiv.scrollTop)
            ) {
                ApplicationTitle.hideUntilReset();
            }
        }
    }

    static handleShowModal() {
        ApplicationTitle.hide();
    }

    static handleHideModal() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (scrollingDiv.scrollLeft >= rightSide - 150) {
            ApplicationTitle.show();
        }
    }

    static handleRenderingEnd() {
        if (window.innerWidth >= canvas.clientWidth && !modalVisible) {
            ApplicationTitle.show();
        }
    }

    static updateScrollToSeeMore() {
        setTimeout(
            () => {
                if (canvas.width * canvas.height < 2000 * 2000) {
                    scrollToSeeMore.style.display = 'none';
                }
                else {
                    scrollToSeeMore.style.display = 'inherit';
                }
            },
            1000
        )
    }
}

scrollingDiv.addEventListener('scrollend', ApplicationTitle.updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchstart', ApplicationTitle.updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchmove', ApplicationTitle.updateAfterScroll, { passive: true });

canvas.addEventListener('renderingend', ApplicationTitle.handleRenderingEnd);
canvas.addEventListener('click', ApplicationTitle.hideUntilReset);
canvas.addEventListener('resetstart', ApplicationTitle.reset);
canvas.addEventListener('resetend', ApplicationTitle.updateScrollToSeeMore);

canvas.addEventListener('showmodal', ApplicationTitle.handleShowModal);
canvas.addEventListener('hidemodal', ApplicationTitle.handleHideModal);
