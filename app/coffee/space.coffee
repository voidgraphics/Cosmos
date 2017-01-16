Star = require './star.js'

class Space
    constructor: ->
        @isRunning = false
        @createCanvas()
        @generateStars()

    createCanvas: ->
        @canvas = document.createElement 'canvas'
        @canvas.classList.add 'stars-canvas'
        document.body.appendChild @canvas
        @ctx = @canvas.getContext '2d'
        @ctx.canvas.width = window.innerWidth
        @ctx.canvas.height = window.innerHeight

    generateStars: ->
        @stars = []
        for index in [0...50]
            @stars[index] = new Star @canvas.width, @canvas.height

    render: ->
        @ctx.clearRect 0, 0, @canvas.width, @canvas.height
        for star in @stars
            star.y += star.speed
            star.x -= star.speed
            if star.y > @canvas.height
                star.y = 0
            if star.x < 0
                star.x = @canvas.width
            @ctx.beginPath()
            @ctx.fillStyle = star.color
            @ctx.arc( star.x, star.y, star.radius, 0, Math.PI * 2, true )
            @ctx.globalAlpha = star.opacity
            @ctx.fill()
            @ctx.closePath()

    selfDestruct: ->
        @isRunning = false
        canvas = document.querySelectorAll '.stars-canvas'
        for tag in canvas
            window.cancelAnimationFrame @iAnimationRequestId
            tag.style.display = 'none'
            # tag.parentNode.removeChild tag

module.exports = Space
