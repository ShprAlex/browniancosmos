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
                    Brownian motion shifts these regions in a continuous wavelike way.
                    This simulation reveals those density waves and shows their fractal nature at
                    different scales.
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
            "endw": Math.floor(window.innerHeight / 4),
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 4,
            "description": `
                <p>
                    This shows our density detection applied to just 10 particles.
                </p>
                <p>
                    As we go from left to right we scan for particles in increasing vertical
                    intervals.
                    It appears like the particle paths are getting thicker but actually we just detect
                    them from further away.
                </p>
                <p>
                    Regions where multiple particles are close together stand out from a longer
                    distance and are colored red, while isolated particles are noticeable at
                    shorter distances and are colored blue.
                    We scan for red, green, and blue interval lengths simultaneously and where they
                    overlap we get white.
                </p>
            `
        },
        "pure-brownian-20": {
            "name": "Underlying Brownian 20",
            "height": 800,
            "width": Math.floor(Math.max(2000, window.innerWidth * 1.8)),
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
                    The pattern can be surprisingly pretty and appears almost intentionally designed.
                </p>
                <p>
                    Even though the particles have random starting positions and move completely
                    independently, we still see regions where the particles appear to move together
                    and large gaps that persist in time.
                </p>
            `
        },
        "pure-brownian-10000": {
            "name": "Underlying Brownian 10,000",
            "height": window.innerHeight,
            "width": Math.floor(Math.max(1000, window.innerWidth * 1.5)),
            "particles": 10000,
            "startw": 1,
            "endw": 1,
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 4,
            "description": `
                <p>
                    Suprisingly even with 10,000 particles we can see regions of density along the
                    vertical axis. Here the brightness represents how many particles are in one space.
                </p>
                <p>
                    The folds and valleys are more noticable on the small scale, but the same kinds of
                    density differences happen at every scale, for instance if we compare the top and
                    bottom half of a column.
                </p>
                <p>
                    Mathematically in a random distribution, the bigger the intervals we compare the
                    bigger the expected difference in the number of particles, proportional to the
                    square root of the interval.
                </p>
            `
        },
        "zero-velocity": {
            "name": "Zero Velocity",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 4),
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 0,
            "description": `
                <p>
                    The quirks of our density detection algithm are more apperent if we keep the
                    particles still.
                </p>
                <p>
                    You can see that the colors appear below the white lines.
                    This is because for any location we subtract the number of particles above from
                    the particles below, and when we're below a line we get a positive difference.
                </p>
                <p>
                    There is thus a downward drift in the colored density areas relative to the
                    center of mass.
                    When there are several particles next to each other the thick colored band
                    grows from the bottom most particle whele the ones on top fade out to blue.
                </p>
            `
        },
        "zero-velocity-tapered": {
            "name": "Zero Velocity Tapered",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 2),
            "waveshape": "triangle",
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
            "startw": 80,
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
        "big-waves-tapered": {
            "name": "Big Waves Tapered",
            "height": 1600,
            "width": 3000,
            "particles": 500,
            "startw": 80,
            "endw": 800,
            "waveshape": "triangle",
            "cellsize": 1,
            "velocity": 8,
            "description": `
                <p>
                    Scanning at large wavelenghts produces nice patterns.
                </p>
                <p>
                    The results look fuzzy, and there is nothing that can be done about that.
                </p>
            `
        },
        "tapered-scan": {
            "name": "Tapered Scan",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 1000,
            "startw": 2,
            "endw": window.innerHeight,
            "waveshape": "triangle",
            "cellsize": 1,
            "velocity": 1,
            "description": `
                <p>
                    A scan with triangle waves looks nice in the big picture.
                </p>
            `
        },
        "pixellated": {
            "name": "Pixellated",
            "height": Math.floor(window.innerHeight * 1.5),
            "width": Math.max(1000, window.innerWidth),
            "particles": 80,
            "startw": 1,
            "endw": Math.floor(window.innerHeight * 1.5 / 8),
            "waveshape": "square",
            "cellsize": 4,
            "velocity": 1,
            "description": `
                <p>
                    Pixellation with noise looks nice up close.
                </p>
            `
        },
    };
}

function getConfiguration(option) {
    return getConfigurations()[option];
}