<template src="../html/settings.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Moment = require "moment"
    Vue = require "vue"

    Settings =
        items: []
        data: ->
            return {
                theme: ''
                squares: []
            }

        ready: ->
            @theme = localStorage.selectedTheme
            @getSvgSquares()

        methods:

            changeTheme: ->
                @displayOverlay()

                that = this

                setTimeout( () ->
                    that.$dispatch 'changeTheme', that.theme
                    that.hideOverlay()
                , 350)

            getSvgSquares: ->
                @squares = [].slice.call document.querySelectorAll '.overlay svg rect'

            hideOverlay: ->
                that = this
                squareNumber = 0
                for square in @squares
                    $amount = @squares.length
                    randomIndex = Math.floor Math.random() * $amount
                    ++squareNumber
                    @hideSquare square, squareNumber
                setTimeout( () ->
                    document.querySelector('.overlay').style.zIndex = -5
                , 350 )

            displayOverlay: ->
                document.querySelector('.overlay').style.zIndex = 5000
                squareNumber = 0
                for square in @squares
                    $amount = @squares.length
                    randomIndex = Math.floor Math.random() * $amount
                    ++squareNumber
                    @displaySquare square, squareNumber


            displaySquare: (square, squareNumber) ->
                setTimeout( () ->
                    square.classList.add 'show'
                , 10 * squareNumber )

            hideSquare: (square, squareNumber) ->
                setTimeout( () ->
                    square.classList.remove 'show'
                , 10 * squareNumber )

    module.exports = Settings

</script>
