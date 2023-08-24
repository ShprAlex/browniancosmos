function getConfigurations() {
    return {
        "default": {
            "name": "Welcome!",
            "height": 2400,
            "width": 6000,
            "particles": 300,
            "startw": 1,
            "endw": 600,
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 5,
            "description": `
                <p>
                    BrownianCosmos is an exploration of patterns present in Brownian motion.
                </p>
                <p>
                    Surprisingly, randomly placed particles contain arbitrary regions of density.
                    When the particles are perturbed by Brownian motion, the density regions 
                    shift in a continuous wavelike way. This simulation reveals these waves and shows their
                    fractal nature at different scales.
                </p>
                <p>
                    We hope you enjoy the results! For further illustrations and explanation please
                    see additional configurations from the charts <i class="fa-solid fa-chart-line"></i>
                    toolbar below.
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
            "waveshape": "square",
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
        "pure-brownian-20": {
            "name": "Underlying Brownian 20",
            "height": 800,
            "width": Math.floor(Math.max(2000,window.innerWidth*1.8)),
            "particles": 20,
            "startw": 1,
            "endw": 1,
            "waveshape": "square",
            "cellsize": 3,
            "velocity": 2,
            "description": `
                <p>
                    Here is what the underlying Brownian motion looks like on it's own.
                </p>
                <p>
                    The pattern can be surprisingly pretty and look almost intentionally designed.
                </p>
                <p>
                    Even though the particles have random starting positions and move completely
                    independently, we still see regions where several partiles seem to move together
                    as well as large gaps that persist in time.
                </p>
            `
        },
        "pure-brownian-10000": {
            "name": "Underlying Brownian 10,000",
            "height": window.innerHeight,
            "width": Math.floor(Math.max(1000,window.innerWidth*1.5)),
            "particles": 10000,
            "startw": 1,
            "endw": 1,
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 4,
        },
        "zero-velocity": {
            "name": "Zero Velocity",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerWidth/2),
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 0,
            "description": `
                <p>
                    We can increase the scanning wavelenths while the partiles aren't moving
                    and they still merge together.
                </p>
            `
        },
        "zero-velocity-triangular": {
            "name": "Zero Velocity Triangular",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerWidth/2),
            "waveshape": "triangular",
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
            "waveshape": "square",
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
            "height": 1600,
            "width": 3000,
            "particles": 500,
            "startw": 100,
            "endw": 800,
            "waveshape": "square",
            "cellsize": 1,
            "velocity": 8,
            "description": `
                <p>
                    This visualization shows the particle paths 1 pixel thick.
                </p>
                <p>
                    The results still look similar because we're looking at a fractal.
                </p>
            `
        },
        "big-waves-triangular": {
            "name": "Big Waves Triangular",
            "height": 2400,
            "width": 6000,
            "particles": 300,
            "startw": 60,
            "endw": 300,
            "waveshape": "triangular",
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
    };
}

function getConfiguration(option) {
    return getConfigurations()[option];
}