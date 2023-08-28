const applicationTitleEl = document.getElementById('applicationTitle');
const scrollToSeeMore = document.getElementById('applicationTitleScrollForMore');
let titleState = null;

class ApplicationTitle {
    static reset() {
        ApplicationTitle.hide();
        titleState = null;
    }

    static show() {
        if (titleState !== 'manually-hidden') {
            applicationTitleEl.style.opacity = 1;
            applicationTitleEl.style.visibility = 'visible';
        }
    }

    static hide() {
        applicationTitleEl.style.opacity = 0;
        applicationTitleEl.style.visibility = 'hidden';
    }

    static hideUntilReset() {
        if (applicationTitleEl.style.visibility === 'visible') {
            ApplicationTitle.hide();
            titleState = 'manually-hidden';
        }
    }

    static updateAfterScroll() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (
            (scrollingDiv.scrollLeft >= rightSide - 150) && !modalVisible
        ) {
            ApplicationTitle.show();
        }
        else {
            // When they manually scroll, hide the title
            if (
                applicationTitleEl.style.visibility === 'visible'
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
