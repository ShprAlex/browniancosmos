const applicationTitleEl = document.getElementById('applicationTitle');
const applicationTitleThirdLine = document.getElementById('applicationTitleThirdLine');
let titleState = null;
let titleTimeoutId = null;

class ApplicationTitle {
    static handleResetStart() {
        clearTimeout(titleTimeoutId);
        titleState = null;
        titleTimeoutId = null;
        if (!isWelcomeConfig()) {
            ApplicationTitle.hide();
            applicationTitleThirdLine.style.display = 'none';
            applicationTitleThirdLine.innerHTML = `
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <br />
                Scroll to see more
            `;
        }
        else {
            ApplicationTitle.show();
            applicationTitleThirdLine.style.display = 'inherit';
            applicationTitleThirdLine.innerHTML = `
                <i class="fa-solid fa-line-chart"></i>
                <br />
                Welcome! Please see the charts menu for more.
            `;
        }
    }

    static handleResetEnd() {
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

    static show() {
        if (titleState === 'force-hidden') {
            return;
        }

        applicationTitleEl.style.opacity = 1;
        applicationTitleEl.style.visibility = 'visible';
        showTitleMenuIcon.classList.add('disabled');

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

    static forceShow() {
        applicationTitleEl.style.opacity = 1;
        applicationTitleEl.style.visibility = 'visible';
        titleState = 'force-visible';
        applicationTitleThirdLine.style.display = 'none';
        showTitleMenuIcon.classList.add('disabled');
    }

    static hide() {
        applicationTitleEl.style.opacity = 0;
        applicationTitleEl.style.visibility = 'hidden';
        showTitleMenuIcon.classList.remove('disabled');
    }

    static forceHide() {
        if (!['visible', 'force-visible'].includes(titleState)) {
            return;
        }
        ApplicationTitle.hide();
        titleState = 'force-hidden';
        showTitleMenuIcon.classList.remove('disabled');
    }

    static updateAfterScroll() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (
            (scrollingDiv.scrollLeft >= rightSide - 150)
            && !modalVisible
            && titleState === null
            && progress > 10 // don't show title immediately after reset
        ) {
            ApplicationTitle.show();
        }
        else {
            // When they manually scroll, hide the title
            if (
                titleState === 'visible'
                && (scrollLeft != scrollingDiv.scrollLeft || scrollTop != scrollingDiv.scrollTop)
                && !isWelcomeConfig()
            ) {
                ApplicationTitle.forceHide();
            }
        }
    }

    static handleShowModal() {
        ApplicationTitle.hide();
    }

    static handleHideModal() {
        const rightSide = canvas.clientWidth - scrollingDiv.offsetWidth;
        if (scrollingDiv.scrollLeft >= rightSide - 150 && finishedRendering) {
            ApplicationTitle.show();
        }
    }

    static handleRenderingEnd() {
        if (window.innerWidth >= canvas.clientWidth && !modalVisible) {
            ApplicationTitle.show();
        }
    }
}

scrollingDiv.addEventListener('scrollend', ApplicationTitle.updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchstart', ApplicationTitle.updateAfterScroll, { passive: true });
scrollingDiv.addEventListener('touchmove', ApplicationTitle.updateAfterScroll, { passive: true });

canvas.addEventListener('renderingend', ApplicationTitle.handleRenderingEnd);
canvas.addEventListener('click', ApplicationTitle.forceHide);
canvas.addEventListener('resetstart', ApplicationTitle.handleResetStart);
canvas.addEventListener('resetend', ApplicationTitle.handleResetEnd);

canvas.addEventListener('showmodal', ApplicationTitle.handleShowModal);
canvas.addEventListener('hidemodal', ApplicationTitle.handleHideModal);
