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
            "particles": 18,
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
            "height": 2000,
            "width": 4000,
            "particles": 300,
            "startw": 0,
            "endw": 600,
            "waveform": "square",
            "cellsize": 2,
            "velocity": 4,
            "palette": "rgb",
            "description": `
                <p>
                    Hello! The idea for BrownianCosmos came about after seeing a surprising pattern
                    in a randomly generated dataset.
                </p>
                <p>
                    It turns out that Brownian motion makes the clumps and gaps of independent
                    particles appear to shift in a collective wavelike way.
                </p>
                <p>
                    Our simulation reveals the fractal nature of these waves. The following charts
                    explain the visualization techniques we're using as well as the underlying
                    data.
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
            "endw": Math.floor(window.innerHeight / 2 / getResolutionFactor()),
            "waveform": "square",
            "cellsize": getResolutionFactor(),
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
                    As we go from left to right we scan for the particles in increasing vertical
                    intervals.
                    We scan for 3 interval lengths simultaneously around every point.
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
                    independently, we still see regions where they congregate and gaps where they
                    separate for lengths of time.
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
                    The folds and valleys are noticeable on the small scale, but the same kinds of
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
                    With zero velocity, you can see how individual particles on the left are
                    grouped together into clumps of color on the right.
                </p>
                <p>
                    This reveals the quirks of our density detection algorithm.
                    The colors show up below the white lines because for any location we subtract
                    the number of particles above from those below, and when we're below a
                    line we get a positive difference.
                </p>
                <p>
                    We get a type of rainbow diffraction effect because the red intervals are
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
            "endw": Math.floor(window.innerHeight / getResolutionFactor()),
            "waveform": "triangle",
            "cellsize": getResolutionFactor(),
            "velocity": 0,
            "palette": "rgb",
            "description": `
                <p>
                    We can use smoothing techniques similar to those for moving averages to
                    produce a cleaner result.
                    Here we're using a triangular weighting for our sliding window.
                </p>
                </p>
                    Smoothed waves better capture density at a specific wavelength, but they lose
                    some of the texture the square waves preserve.
                </p>
            `
        },
        "zero-velocity-cosine": {
            "name": "Zero Velocity Cosine",
            "height": window.innerHeight,
            "width": window.innerWidth,
            "particles": 50,
            "startw": 2,
            "endw": Math.floor(window.innerHeight / 2),
            "waveform": "cosine",
            "cellsize": 1,
            "velocity": 0,
            "palette": "bw",
            "description": `
                <p>
                    The seemingly merging paths illustrate the workings of our refined density
                    detection algorithm resolving larger clusters of particles from further
                    away.
                </p>
                <p>
                    The advantage of a Cosine wave as opposed to a sine wave is that it is
                    symmetrical around the center.
                </p>
                <p>
                    Alas, a lack of distortion can be less visually intriguing, which is why we've
                    opted to use the other waveforms for the other examples.
                </p>
            `
        },
        "big-waves": {
            "name": "Big Waves",
            "height": 1200 * getResolutionFactor(),
            "width": 3000 * getResolutionFactor(),
            "particles": 300,
            "startw": 60,
            "endw": 600 / getResolutionFactor(),
            "waveform": "square",
            "cellsize": getResolutionFactor(),
            "velocity": 5,
            "palette": "rgb",
            "description": `
                <p>
                    Combining density detection with Brownian motion reveals the Brownian density
                    waves.
                </p>
                <p>
                    Interestingly, the same fractal pattern occurs at every scale and particle
                    density. As we scan for density differences over larger intervals, the result
                    is that we get larger slower moving waves, almost as if we had zoomed in
                    rather than zooming out.
                </p>
                <p>
                    Tip: use custom settings to view this is black and white.
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
            "cellsize": getResolutionFactor(),
            "velocity": 5,
            "palette": "rgb",
            "description": `
                <p>
                    This is how the waves look using a smoothed density detection technique.
                </p>
                <p>
                    The detected red waves are 2x the thickness of the green waves, which are
                    2x as thick as the blue waves.
                </p>
                <p>
                    For a wave to move, all the underlying particles need to move in the same
                    direction, and for a wave to fade, all the underlying particles need to
                    scatter, making thick waves more stable than thinner waves.
                </p>
            `
        },
        "pixelated": {
            "name": "Pixelated",
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
                    The pixelated view highlights the Brownian motion at the source of our data.
                </p>
                <p>
                    At each step right the underlying particles move one step up, down, or stay
                    with equal probability.
                </p>
                <p>
                    This is a fun and artistic perspective which appears to convert a digital
                    binary input into a rainbow colored analogue output, though of course this is
                    all done digitally.
                </p>
            `
        },
    };
}

function getResolutionFactor() {
    return window.innerWidth < 800 ? 1 : 2;
}

function getConfiguration(option) {
    return getConfigurations()[option];
}

function loadConfiguration(urlParams) {
    let configurationId = urlParams.get('configuration') || 'welcome';
    if (!getConfiguration(configurationId)) {
        configurationId = 'default';
    }
    const configuration = getConfiguration(configurationId);
    if (
        (!urlParams.get('configuration') && urlParams.size > 0)
        || urlParams.size > 1
        || configurationId === 'default'
    ) {
        // default config is just a fallback, so call it 'custom' anyway.
        configuration.id = 'custom';
    }
    else {
        configuration.id = configurationId;
    }

    urlParams.forEach((value, key) => {
        if (!isNaN(value)) {
            configuration[key] = parseFloat(value);
        }
        else {
            configuration[key] = value;
        }
    });
    return configuration;
}

export { getConfiguration, getConfigurations, loadConfiguration };
