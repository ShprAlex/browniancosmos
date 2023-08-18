
function getPresets(option) {
    return {
        "default": {
            "height": 2400,
            "width": 7200,
            "particles": 300,
            "startw": 1,
            "endw": 600,
            "cellsize": 2,
            "velocity": 4,
        },
        "10-particles": {
            "height": window.innerHeight,
            "width": Math.max(1000, window.innerWidth),
            "particles": 10,
            "startw": 1,
            "endw": window.innerHeight/4,
            "cellsize": 2,
            "velocity": 4,
        },
        "pure-brownian-30": {
            "height": window.innerHeight,
            "width": Math.max(1000,window.innerWidth*3),
            "particles": 30,
            "startw": 1,
            "endw": 1,
            "cellsize": 3,
            "velocity": 3,
        },
        "pure-brownian-10000": {
            "height": window.innerHeight,
            "width": Math.max(1000,window.innerWidth*3),
            "particles": 10000,
            "startw": 1,
            "endw": 1,
            "cellsize": 2,
            "velocity": 4,
        },
        "big-waves": {
            "height": window.innerHeight*1.5,
            "width": 9600,
            "particles": 300,
            "startw": Math.floor(window.innerHeight*1.5/16),
            "endw": Math.floor(window.innerHeight*1.5/4),
            "cellsize": 2,
            "velocity": 4,
        },
    }[option];
}