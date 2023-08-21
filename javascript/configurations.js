function getConfigurations() {
    return {
        "default": {
            "name": "Welcome!",
            "height": 2400,
            "width": 6000,
            "particles": 300,
            "startw": 1,
            "endw": 600,
            "cellsize": 2,
            "velocity": 5,
            "description": `
                <p>
                    BrownianCosmos is an exploration of patterns present in Brownian motion.
                </p>
                <p>
                    Surprisingly, randomly placed particles in a bounded span will contain
                    arbitrary regions of density. Under Brownian motion these regions of density 
                    move in a continuoys wavelike way. Here we reveal these waves and
                    their fractal nature at different scales.
                </p>
                <p>
                    For a further explanation of this simulation and the visualization
                    techniques used here please see additional configurations from the settings 
                    <i class="fa-solid fa-gear"></i> toolbar on the bottom.
                </p>
            `
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
            "description": `
                <p>
                    This shows the same process as in the "welcome" configuration,
                    applied to only 10 particles.
                </p>
                <p>
                    As we go from left to right we increase the length of the waves we're
                    looking for. As we do that, the paths of the particles merge together.
                </p>
                <p>
                    Regions where multiple particles overlap get colored red, and those
                    with few adjacent particles go to blue and fade to black.
                </p>
            `
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