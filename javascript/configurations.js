function getConfigurations() {
    return {
        "default": {
            "name": "Default",
            "height": 2400,
            "width": 6000,
            "particles": 300,
            "startw": 1,
            "endw": 600,
            "cellsize": 2,
            "velocity": 5,
        },
        "10-particles": {
            "name": "10 Particles",
            "height": window.innerHeight,
            "width": Math.max(1000, window.innerWidth),
            "particles": 10,
            "startw": 1,
            "endw": window.innerHeight/4,
            "cellsize": 2,
            "velocity": 4,
        },
        "pure-brownian-30": {
            "name": "Basis Brownian 30",
            "height": Math.max(800,window.innerHeight),
            "width": Math.max(2000,window.innerWidth*1.8),
            "particles": 30,
            "startw": 1,
            "endw": 1,
            "cellsize": 3,
            "velocity": 3,
        },
        "pure-brownian-10000": {
            "name": "Basis Brownian 10,000",
            "height": window.innerHeight,
            "width": Math.floor(Math.max(1000,window.innerWidth*1.5)),
            "particles": 10000,
            "startw": 1,
            "endw": 1,
            "cellsize": 2,
            "velocity": 4,
        },
        "big-waves": {
            "name": "Big Waves",
            "height": 2400,
            "width": 6000,
            "particles": 300,
            "startw": 60,
            "endw": 300,
            "cellsize": 2,
            "velocity": 5,
        },
    };
}

function getConfiguration(option) {
    return getConfigurations()[option];
}