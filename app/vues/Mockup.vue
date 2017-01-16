<template src="../html/projectmockup.html"></template>

<script lang="coffee">
    Vue = require "vue"
    Moment = require "moment"
    autosize = require 'autosize'
    nl2br = require 'nl2br'
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
                formInverted: false
                removedPopupIsShowing: false
                isDeletePopupShowing: false
             }
        directives:
            focus: (require "vue-focus").focus

        ready: ->
            @$mockup = document.getElementById "mockup"
            @$overlay = document.getElementById "overlay"

            # Getting mockup
            socket.emit "mockup.get", @$route.params.id
            socket.on "mockup.sent", ( oMockup ) =>
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                @mockup = oMockup
                this.$nextTick () ->
                    @positionOverlay()

            socket.on "mockup.removed", ( sMockupId ) =>
                if sMockupId == @mockup.uuid then @redirectAfterRemoval()

            # Getting comments
            socket.emit "comment.get", @$route.params.id, ( aComments ) =>
                for oComment in aComments
                    @pushComment oComment

            socket.on "comment.sent", ( oComment ) =>
                @pushComment oComment

            socket.on "comment.addAvatar", ( sCommentId, sAvatar ) =>
                for oComment in @comments
                    if oComment.uuid == sCommentId
                        oComment.user.avatar = "data:image/png;base64,#{sAvatar}"

            # Listen for window resizing
            window.addEventListener "resize", @positionOverlay

        methods:
            redirectAfterRemoval: ->
                @removedPopupIsShowing = true
                setTimeout(() =>
                    @$router.go "/mockups"
                , 5000 )

            positionOverlay: ->
                setTimeout(() =>
                    pos = @getMockupPosition()

                    @$overlay.style.top = pos.top + "px"
                    @$overlay.style.left = pos.left + "px"
                    @$overlay.style.width = pos.width + "px"
                    @$overlay.style.height = pos.height + "px"
                , 300 )

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
                @formInverted = xPos > 50
                Vue.nextTick( () =>
                    autosize document.getElementById "newComment"
                )

            sendComment: ->
                if @newMessage == "" then return
                comment = {
                    x: @formPos.x
                    y: @formPos.y
                    mockup:
                        id: @$route.params.id
                    author:
                        id: localStorage.userId
                    text: nl2br @newMessage, false
                    isShowing: false
                }

                socket.emit "comment.submit", comment, localStorage.selectedProject

                @newMessage = ""
                @showForm = false

            pushComment: ( oComment ) ->
                oComment.isShowing = false
                if oComment.x > 75
                    oComment.class = "flipped"
                else
                    oComment.class = ""
                @comments.push oComment


            toggle: ( comment, event ) ->
                $el = event.target
                el = event.target.tagName
                while el isnt "A"
                    el = $el.parentNode.tagName
                    $el = $el.parentNode

                $el.classList.toggle "mockup__comment--showing"
                comment.isShowing = !comment.isShowing

            confirmDelete: () ->
                socket.emit 'mockup.delete', @mockup.uuid, localStorage.selectedProject
                @$router.go "/mockups"

        events:
            changeProject: ( oTeam, oProject ) ->
                @$router.go "/mockups"

        filters:
            formatted: ( value ) ->
                return Moment(value).format "MMMM Do YYYY"

    module.exports = Mockup

</script>
