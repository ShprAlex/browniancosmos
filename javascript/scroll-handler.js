const scrollingDiv = document.getElementById('scrollingDiv');

let scrollSpeed;
let scrollLeft;
let scrollTop;
let startedScrolling;
let finishedScrolling;

class Scroller {
    static initialize() {
        scrollingDiv.addEventListener('scrollend', Scroller.updateAutoScroll, {passive: true});
        scrollingDiv.addEventListener('touchstart', Scroller.updateAutoScroll, {passive: true});
        scrollingDiv.addEventListener('touchmove', Scroller.updateAutoScroll, {passive: true});
        canvas.addEventListener('showmodal', () => { scrollSpeed = 0.5; });
        canvas.addEventListener('hidemodal', () => { scrollSpeed = 2; });
    }
    
    static reset() {
        scrollSpeed = 2;
        startedScrolling = false;
        finishedScrolling = false;
    
        scrollLeft = 0;
        scrollTop = canvas.clientHeight-scrollingDiv.offsetHeight;
        scrollingDiv.scrollLeft = scrollLeft;
        scrollingDiv.scrollTop = scrollTop;
    }
    
    static updateAutoScroll() {
        const leftSide = scrollSpeed;
        const rightSide = canvas.clientWidth-scrollingDiv.offsetWidth;
        if (
            startedScrolling 
            && !finishedScrolling 
            && (scrollingDiv.scrollLeft<=leftSide || scrollingDiv.scrollLeft>=rightSide)
        ) {
            scrollLeft = scrollingDiv.scrollLeft;
            scrollTop = scrollingDiv.scrollTop;
            finishedScrolling = true;
        }
    }
    
    static scroll() {
        if (Math.abs(scrollLeft-scrollingDiv.scrollLeft)>scrollSpeed || Math.abs(scrollTop-scrollingDiv.scrollTop)>scrollSpeed) {
            scrollLeft = scrollingDiv.scrollLeft;
            scrollTop = scrollingDiv.scrollTop;
        }
        if (progress>window.innerWidth/CELL_SIZE) {
            if (!startedScrolling) {
                scrollLeft+=scrollSpeed; // extra boost at the start
            }
            startedScrolling = true;
            scrollLeft+=scrollSpeed;
            scrollLeft = Math.min(scrollLeft, canvas.clientWidth-scrollingDiv.offsetWidth);
            // When starting waves are small, start scrolling up a quarter of the way through the animation.
            // Don't scroll up if the canvas height is only a little bigger than the window height.
            if ((scrollLeft>canvas.clientWidth/4 || START_WAVELENGTH>10) && canvas.clientHeight>window.innerHeight*1.2) {
                const distLeft = Math.max(0.01, canvas.clientWidth-scrollingDiv.offsetWidth-scrollLeft);
                scrollTop -= Math.min(1,scrollTop/distLeft)*scrollSpeed;
                scrollTop = Math.max(0, scrollTop);
            }
            if (scrollingDiv.scrollLeft == scrollLeft && scrollingDiv.scrollTop==scrollTop) {
                finishedScrolling = true;
            }
            scrollingDiv.scrollLeft = scrollLeft;
            scrollingDiv.scrollTop = scrollTop;
        }
    }
}
