# BrownianCosmos

BrownianCosmos is a visualization of surprising density patterns generated by Brownian motion.

An example of the counter-intuitive nature of randomness, we find that multiple randomly moving
particles form fractal density waves.

The results are presented as an interactive slideshow that explains this effect.

[Interactive Slideshow](https://shpralex.github.io/browniancosmos/)

![BrownianCosmos](https://github.com/ShprAlex/browniancosmos/blob/main/BrownianCosmos.png)

## Source code

BrownianCosmos started as an experiment generated with a few lines of python code and got
built out into a javascript presentation.

The final slideshow hosted on gihub pages can be seen here:

[https://shpralex.github.io/browniancosmos/](https://shpralex.github.io/browniancosmos/)

### Python

The original python code is under the **/python**  directory. To see the results run:
```
$ pip install -r requirements.txt
$ python3 brownian_cosmos.py
```

### Javascript

The javascript code is under the **/javascript** directory.

It is a static webpage. The code uses javascript modules, so to view it locally you need to
run:
```
$ npm start

http://localhost
```

## Next Steps

This project came about from an investigation of emergent patterns generated by 1D agents.
It turned out that even random independent motion is interesting on its own, but
there may be more simulations to come that show what happens when agents interact.

The performance of this visualization can certainly be improved using shaders. Looking forward
to trying this in the future!

## License

This project is licensed under the MIT License - see the LICENSE file for details
