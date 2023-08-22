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
                    Surprisingly, randomly placed particles will contain arbitrary regions of density.
                    When the particles are randomly perturbed by Brownian motion, the density regions 
                    move in a continuous wavelike way. Here we reveal these waves and show their
                    fractal nature at different scales.
                </p>
                <p>
                    We hope you enjoy the results! For a further explanation of this simulation and its
                    visualization techniques please see additional configurations from the settings
                    <i class="fa-solid fa-gear"></i> toolbar below.
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
                    This shows the same process applied to only 10 particles.
                </p>
                <p>
                    As we go from left to right we scsn for neighboring particles in
                    increasing vertical intervals. It appears like the paths are getting thinner
                    but actually the underlying particle paths are still thin, we just detect them
                    from further away.
                </p>
                <p>
                    Regions where multiple particles are close together stand out when we look over
                    longer distances and are colored red, while isolated particles show up in shorter
                    blue scans and eventually fade to black.
                </p>
            `
        },
        "pure-brownian-30": {
            "name": "Underlying Brownian 30",
            "height": Math.max(800,window.innerHeight),
            "width": Math.max(2000,window.innerWidth*1.8),
            "particles": 30,
            "startw": 1,
            "endw": 1,
            "cellsize": 3,
            "velocity": 3,
        },
        "pure-brownian-10000": {
            "name": "Underlying Brownian 10,000",
            "height": window.innerHeight,
            "width": Math.floor(Math.max(1000,window.innerWidth*1.5)),
            "particles": 10000,
            "startw": 1,
            "endw": 1,
            "cellsize": 2,
            "velocity": 4,
        },
        "zero-velocity": {
            "name": "Zero Velocity",
            "height": screen.height,
            "width": screen.width,
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerHeight/2),
            "cellsize": 2,
            "velocity": 0,
            "description": `
                <p>
                    We can increase the scanning wavelenths while the partiles aren't moving
                    and they still merge together.
                </p>
            `
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
            "description": `
                <p>
                    Scanning at large wavelenghts produces nice patterns.
                </p>
                <p>
                    The results look fuzzy, and there is nothing that can be done about that.
                </p>
            `
        },
        "big-waves-high-res": {
            "name": "Big Waves High Res",
            "height": 1800,
            "width": 6000,
            "particles": 500,
            "startw": 90,
            "endw": 450,
            "cellsize": 1,
            "velocity": 10,
            "description": `
                <p>
                    This visualization shows the particle paths 1 pixel thick.
                </p>
                <p>
                    The results still look similar because we're looking at a fractal.
                </p>
            `
        },
    };
}

function getConfiguration(option) {
    return getConfigurations()[option];
}