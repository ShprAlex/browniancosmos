const fullscreenIcon = document.getElementById('fullscreenIcon');

fullscreenIcon.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('overlay').style.opacity = '0';
    } else {
        document.exitFullscreen();
    }
});
document.addEventListener('click', function(e) {
    if (window.innerHeight - e.clientY <= 50) {
        /* ignore clicks on overlay */
        return;
    }

    if (document.getElementById('overlay').style.opacity === '0') {
        document.getElementById('overlay').style.opacity = '1';
    } else {
        document.getElementById('overlay').style.opacity = '0';
    }
});