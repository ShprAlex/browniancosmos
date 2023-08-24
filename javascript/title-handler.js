const applicationTitleEl = document.getElementById('applicationTitle');
const scrollToSeeMore = document.getElementById('applicationTitleScrollForMore');

class ApplicationTitle {
    static show() {
        applicationTitleEl.style.opacity = 1;
        applicationTitleEl.style.visibility = 'visible';
    }

    static hide() {
        applicationTitleEl.style.opacity = 0;
        applicationTitleEl.style.visibility = 'hidden';
    }

    static updateAfterScroll() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (
            (scrollingDiv.scrollLeft >= rightSide - 150)
            && !modalVisible
            && finishedScrolling === false
        ) {
            ApplicationTitle.show();
        }
        else {
            // When they manually scroll, hide the title
            if (finishedScrolling && (scrollLeft != scrollingDiv.scrollLeft || scrollTop != scrollingDiv.scrollTop)) {
                ApplicationTitle.hide();
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
canvas.addEventListener('click', ApplicationTitle.hide);
canvas.addEventListener('resetstart', ApplicationTitle.hide);
canvas.addEventListener('resetend', ApplicationTitle.updateScrollToSeeMore);

aboutModalEl.addEventListener('show.bs.modal', ApplicationTitle.handleShowModal);
aboutModalEl.addEventListener('hide.bs.modal', ApplicationTitle.handleHideModal);
settingsModalEl.addEventListener('show.bs.modal', ApplicationTitle.handleShowModal);
settingsModalEl.addEventListener('hide.bs.modal', ApplicationTitle.handleHideModal);
