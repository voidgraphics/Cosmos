class Star
    constructor: ( width, height )  ->
        @x = Math.random() * width
        @y = Math.random() * height
        @radius = Math.random() + 0.5
        @speed = 0.7
        @opacity = Math.random() * 1.9
        @color = '#9db4c0'

module.exports = Star
