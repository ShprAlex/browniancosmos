function getConfigurations() {
    return {
        "default": {
            "name": "Welcome!",
            "height": 2400,
            "width": 5000,
            "particles": 300,
            "startw": 0,
            "endw": 600,
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 5,
            "palette": "rgb",
            "description": `
                <p>
                    BrownianCosmos is an exploration of patterns in Brownian motion.
                </p>
                <p>
                    We tend to expect randomness to even out, so it's surprising that randomly
                    placed particles have clumps and gaps.
                    Brownian motion accentuates these features causing them to shift in a
                    continuous wavelike way.
                    Our simulation reveals these density waves and shows their fractal nature at
                    different scales.
                </p>
                <p>
                    We hope you enjoy the results!
                    Please see the charts <i class="fa-solid fa-chart-line"></i> toolbar below for
                    additional illustrations.
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
            "palette": "rgb",
            "description": `
                <p>
                    This shows our density detection applied to just 10 particles.
                </p>
                <p>
                    It appears as if the particle paths are getting thicker, but actually we just
                    detect them from further away.
                </p>
                <p>
                    As we go from left to right we scan for the number of particles in increasing
                    vertical intervals.
                    In the vertical direction we scan for 3 interval lengths simultaneously around
                    every point.
                    We color the point red, green, and blue depending on which interval size met
                    the density criteria, and white if it's all of them.
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
            "palette": "rgb",
            "description": `
                <p>
                    Here is what the underlying Brownian motion looks like on its own.
                </p>
                <p>
                    Even though the particles have random starting positions and move completely
                    independently, we still see regions where the particle paths appear to
                    congregate and large gaps where they seem to avoid each other over time.
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
            "palette": "rgb",
            "description": `
                <p>
                    Even with 10,000 particles we can see density regions without everything fading
                    to a smooth gray.
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
            "width": Math.min(window.innerWidth, Math.ceil(window.innerHeight*3/4)),
            "particles": 30,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 2),
            "waveshape": "square",
            "cellsize": 1,
            "velocity": 0,
            "palette": "rgb",
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
                    We also get a type of rainbow diffraction effect because the longer red
                    intervals are longer then the green and blue other ones yet they are all
                    aligned together at the top.
                </p>
            `
        },
        "zero-velocity-smoothed": {
            "name": "Zero Velocity Smoothed",
            "height": window.innerHeight,
            "width": Math.min(window.innerWidth, Math.ceil(window.innerHeight*3/4)),
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 2),
            "waveshape": "triangle",
            "cellsize": 2,
            "velocity": 0,
            "palette": "rgb",
            "description": `
                <p>
                    We can use smoothing techniques similar to those for moving averages to
                    produce a cleaner result.
                </p>
                <p>
                    The square wave we've been using has a sharp boundary when particles enter
                    in and out of our scanning window.
                    We can smooth things by using a triangle or sine scanning wave to give less
                    weight to the particles at the ends and more to those in the middle.
                </p>
                </p>
                    Smoothed waves better capture density at a specific wavelengh, but they lose
                    some of the texture the square waves preserve.
                </p>
            `
        },
        "zero-velocity-cosine": {
            "name": "Zero Velocity Cosine",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 4,
            "endw": Math.floor(window.innerHeight / 2),
            "waveshape": "cosine",
            "cellsize": 1,
            "velocity": 0,
            "palette": "bw",
            "description": `
                <p>
                    Cosine shows us what things look like without downward distortion.
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
            "palette": "rgb",
            "description": `
                <p>
                    Scanning at large wavelenghts produces nice patterns.
                </p>
                <p>
                    The results look fuzzy, and there is nothing that can be done about that.
                </p>
            `
        },
        "big-waves-bw": {
            "name": "Big Waves B&W",
            "height": 1200,
            "width": 3000,
            "particles": 300,
            "startw": 40,
            "endw": 200,
            "waveshape": "square",
            "cellsize": 2,
            "velocity": 5,
            "palette": "bw",
            "description": `
                <p>
                    Scanning at large wavelenghts produces nice patterns.
                </p>
                <p>
                    The results look fuzzy, and there is nothing that can be done about that.
                </p>
            `
        },
        "big-waves-smoothed": {
            "name": "Big Waves Smoothed",
            "height": window.innerHeight,
            "width": 3000,
            "particles": 300,
            "startw": 60,
            "endw": 300,
            "waveshape": "cosine",
            "cellsize": 1,
            "velocity": 5,
            "palette": "rgb",
            "description": `
                <p>
                    Scanning at large wavelenghts produces nice patterns.
                </p>
                <p>
                    The results look fuzzy, and there is nothing that can be done about that.
                </p>
            `
        },
        "pixellated": {
            "name": "Pixellated",
            "height": window.innerHeight,
            "width": Math.max(1000, window.innerWidth),
            "particles": 60,
            "startw": 0,
            "endw": Math.floor(window.innerHeight / 10),
            "waveshape": "square",
            "cellsize": 4,
            "velocity": 1,
            "palette": "rgb",
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