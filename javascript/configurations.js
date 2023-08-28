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
                    BrownianCosmos is an exploration of patterns in Brownian motion.
                </p>
                <p>
                    We tend to expect randomness to even out, so it's surprising to find that
                    clumps and gaps are everpresent in randomply placed particles. Brownian
                    motion accentuates these features causing them to shift in a continuous
                    wavelike way.
                    Our simulation reveals these density waves and shows their fractal nature at
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
                    It appears as if the particle paths are getting thicker, but actually we just
                    detect the particles from further away.
                </p>
                <p>
                    As we go from left to right we scan for the number of particles in increasing
                    vertical intervals.
                    In the vertical direction we scan for 3 interval lengths simultaneously around
                    every point.
                    If the interval contains enough particels, we color the point red, green, and
                    blue depending on which of the intervals met the density criteria, and white
                    if it's all of them.
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
                    Here is what the underlying Brownian motion looks like on its own.
                </p>
                <p>
                    The pattern can be surprisingly pretty and appear almost intentionally designed.
                </p>
                <p>
                    Even though the particles have random starting positions and move completely
                    independently, we still see regions where the particle paths overlap
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
                    Even with 10,000 particles we can see density regions. Here the brightness
                    represents how many particles are in one space.
                </p>
                <p>
                    The folds and valleys are noticable on the small scale, but the same kinds of
                    density differences happen at every scale, for instance if we compare the top and
                    bottom half of a column.
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
                    While somewhat distorted this technique still accurately reveals where the
                    density regions are staying true to the data.
                </p>
            `
        },
        "zero-velocity-smoothed": {
            "name": "Zero Velocity Smoothed",
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
                    We've been using a square wave to detect density patterns, by subtracting
                    the number of particles at an interval above from those below. The square
                    wave has a sharp boundary with particles suddently entering our scanning
                    window.
                </p>
                <p>
                    We can use smoothing techniques similar to those for moving averages to
                    give less weight to the particles at the ends of the intervals and increasing
                    the weight towards the middle forming a triangular wave or a sine wave.
                </p>
                </p>
                    Smoothed waves better capture density at a specific wavelengh, but they lose
                    some of the texture the square waves preserve.
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
        "big-waves-smoothed": {
            "name": "Big Waves Smoothed",
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
        "smoothed-scan": {
            "name": "Smoothed Scan",
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
            "height": window.innerHeight,
            "width": Math.max(1000, window.innerWidth),
            "particles": 60,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 10),
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