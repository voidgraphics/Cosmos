<template src="../html/projectmockup.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Mockup =
        items: []
        data: ->
            return {
                mockup: {}
                $mockup: null
                showForm: false
                formPos: { x: 0, y: 0 }
                newMessage: ""
                comments: []
             }

        ready: ->
            @$mockup = document.getElementById "mockup"
            @$overlay = document.getElementById "overlay"
            console.log zouti.uuid()

            # Getting mockup
            socket.emit "mockup.get", @$route.params.id
            socket.on "mockup.sent", ( oMockup ) =>
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                @mockup = oMockup
                this.$nextTick () ->
                    @positionOverlay()
            socket.on "mockup.error", ( sError ) ->
                console.log sError

            # Getting comments
            socket.emit "comment.get", 1, ( aComments ) =>
                for oComment in aComments
                    oComment.isShowing = false
                    if oComment.x > 75
                        oComment.class = "flipped"
                    else
                        oComment.class = ""
                    @comments.push oComment

            # Listen for window resizing
            window.addEventListener "resize", @positionOverlay

        methods:
            positionOverlay: ->
                pos = @getMockupPosition()

                @$overlay.style.top = pos.top + "px"
                @$overlay.style.left = pos.left + "px"
                @$overlay.style.width = pos.width + "px"
                @$overlay.style.height = pos.height + "px"

            getMockupPosition: ->
                rect = @$mockup.getBoundingClientRect()

                scrollTop = window.pageYOffset
                scrollLeft = window.pageXOffset
                return {
                    top: rect.top + scrollTop
                    height: @$mockup.height
                    left: rect.left + scrollLeft
                    width: @$mockup.width
                }

            getCoordinates: ( e ) ->
                xPos = e.x + window.pageXOffset
                yPos = e.y + window.pageYOffset

                xPos -= @$mockup.offsetLeft
                yPos -= @$mockup.offsetTop

                mockupWidth = @$mockup.width
                mockupHeight = @$mockup.height

                xPercent = ( xPos / mockupWidth ) * 100
                yPercent = ( yPos / mockupHeight ) * 100

                @addComment( xPercent, yPercent )

            addComment: ( xPos, yPos ) ->
                @formPos.x = xPos
                @formPos.y = yPos
                @showForm = true

            sendComment: ->
                console.log @newMessage
                console.log @formPos

                comment = {
                    x: @formPos.x
                    y: @formPos.y
                    mockup:
                        id: 1
                    author:
                        id: "eae67478-b360-4ca5-8f41-f0553795938d"
                        username: "Void"
                    text: @newMessage
                    isShowing: false
                }

                @comments.push comment

                socket.emit "comment.submit", comment

                @newMessage = ""
                @showForm = false

            toggle: ( comment, event ) ->
                $el = event.target
                el = event.target.tagName
                while el isnt "A"
                    el = $el.parentNode.tagName
                    $el = $el.parentNode

                $el.classList.toggle "mockup__comment--showing"
                comment.isShowing = !comment.isShowing

    module.exports = Mockup

</script>
