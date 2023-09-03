function getConfigurations() {
    return {
        "default": {
            "name": "Default",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 20,
            "startw": Math.floor(window.innerHeight / 2),
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "square",
            "cellsize": 1,
            "velocity": 5,
            "palette": "rgb",
            "description": `This should never be shown and only used as a backup.`
        },
        "welcome": {
            "name": "Welcome!",
            "height": window.innerHeight,
            "width": 6000,
            "particles": 20,
            "startw": Math.floor(window.innerHeight / 2),
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "square",
            "cellsize": 1,
            "velocity": 5,
            "palette": "rgb",
            "description": ``
        },
        "overview": {
            "name": "Overview",
            "height": 2400,
            "width": 5000,
            "particles": 300,
            "startw": 0,
            "endw": 600,
            "waveform": "square",
            "cellsize": 2,
            "velocity": 4,
            "palette": "rgb",
            "description": `
                <p>
                    Hello!
                </p>
                <p>
                    The idea for BrownianCosmos came about after seeing a surprising pattern in
                    a randomly generated dataset.
                    It turned out to be due to Brownian motion which makes the clumps and gaps of
                    independent particles appear to shift in a collective wavelike way.
                </p>
                <p>
                    Our simulation reveals these waves and shows their fractal nature at different
                    scales.
                </p>
                <p>
                    We hope you enjoy the results!
                    Please see the <i class="fa-solid fa-chart-line"></i> menu for more.
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
            "waveform": "square",
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
            "waveform": "square",
            "cellsize": 3,
            "velocity": 2,
            "palette": "rgb",
            "description": `
                <p>
                    Here is what the underlying Brownian motion looks like on its own.
                </p>
                <p>
                    Even though the particles have random starting positions and move completely
                    independently, we still see regions where the particles seem to
                    congregate and gaps where they appear to avoid each other over time.
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
            "waveform": "square",
            "cellsize": 2,
            "velocity": 4,
            "palette": "rgb",
            "description": `
                <p>
                    Even with 10,000 particles we can see regions of density.
                </p>
                <p>
                    The folds and valleys are noticable on the small scale, but the same kinds of
                    density differences happen at every scale, for instance if we compare the top
                    and bottom half of a column.
                </p>
                <p>
                    Mathematically, the expected difference in the number of particles between
                    two equal sized intervals grows roughly in proportion to the square root of the
                    interval length.
                </p>
            `
        },
        "zero-velocity": {
            "name": "Zero Velocity",
            "height": window.innerHeight,
            "width": Math.min(window.innerWidth, Math.max(600, Math.ceil(window.innerHeight * 3 / 4))),
            "particles": 30,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "square",
            "cellsize": 1,
            "velocity": 0,
            "palette": "rgb",
            "description": `
                <p>
                    The quirks of our density detection algorithm are more apperent if we keep the
                    particles still.
                </p>
                <p>
                    You can see that the colors show up below the white lines.
                    This is because for any location we subtract the number of particles below from
                    those above, and when we're below a line we get a positive difference.
                </p>
                <p>
                    We also get a type of rainbow diffraction effect because the red intervals are
                    longer then the green and blue ones when they first show up, and stick out
                    at the bottom.
                </p>
            `
        },
        "zero-velocity-smoothed": {
            "name": "Zero Velocity Smoothed",
            "height": window.innerHeight,
            "width": Math.min(window.innerWidth, Math.max(600, Math.ceil(window.innerHeight * 3 / 4))),
            "particles": 50,
            "startw": 1,
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "triangle",
            "cellsize": 2,
            "velocity": 0,
            "palette": "rgb",
            "description": `
                <p>
                    We can use smoothing techniques similar to those for moving averages to
                    produce a cleaner result.
                </p>
                </p>
                    Smoothed waves better capture density at a specific wavelengh, but they lose
                    some of the texture the square waves preserve.
                </p>
                <p>
                    Here we're using a triangular wavelet for our sliding window to compute the
                    density difference between the up and down wings of the wave.
                </p>

            `
        },
        "zero-velocity-cosine": {
            "name": "Zero Velocity Cosine",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 15,
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "cosine",
            "cellsize": 1,
            "velocity": 0,
            "palette": "bw",
            "description": `
                <p>
                    The advantage of a cosine wave as opposed to a sine wave is that cosine is
                    symmetrical around the center.
                </p>
                <p>
                    This means we can show the density regions centered over the underlying
                    particles.
                </p>
                <p>
                    Alas a lack of distortion can be less visually intriguing, which is why we've
                    opted to use the other waveforms for the other examples.
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
            "waveform": "square",
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
                <p>
                    Try it in black and white.
                </p>
            `
        },
        "big-waves-smoothed": {
            "name": "Big Waves Smoothed",
            "height": window.innerHeight,
            "width": Math.max(800, window.innerWidth),
            "particles": 300,
            "startw": 60,
            "endw": 300,
            "waveform": "cosine",
            "cellsize": window.innerHeight < 800 ? 1 : 2,
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
            "waveform": "square",
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