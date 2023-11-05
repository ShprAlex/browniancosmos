# BrownianCosmos

BrownianCosmos is a visualization of surprising density patterns in Brownian motion.

As an example of the counter-intuitive nature of randomness, we find that multiple randomly moving
particles form fractal density waves.

The results are presented as an interactive slideshow that explains this effect.

[Interactive slideshow](https://shpralex.github.io/browniancosmos/)

![BrownianCosmos](https://github.com/ShprAlex/browniancosmos/blob/main/BrownianCosmos.png)

## Source code

BrownianCosmos started as a simple visualization generated with a few lines of python code and got
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

It is a simple static webpage. The code uses javascript modules, so to view it locally you need to
run:
```
$ npm start

http://localhost
```

## Next Steps

This project came about as a detour of investigating emergent patterns formed by simple
1D agents. There may be more to come exploring more sophisticated interaction than just random
motion.

The performance of this visualization can certainly be improved using shaders. Looking forward
to trying this in the future!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ShprAlex/browniancosmos/blob/main/LICENSE) file for details
