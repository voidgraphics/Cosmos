<template src="../html/projectmockups.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Tasks =
        items: []
        data: ->
            return {
                mockups: []
                popupIsShowing: false

                newMockup: {
                    name: ""
                    file: null
                }
             }

        ready: ->
            socket.emit "mockup.getAll", localStorage.selectedProject
            socket.on "mockup.sent", ( oMockup, iCommentCount ) =>
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                oMockup.href = "/mockups/#{oMockup.id}"
                oMockup.commentCount = iCommentCount
                @mockups.push oMockup

        methods:
            togglePopup: ->
                @popupIsShowing = !@popupIsShowing

            addMockup: ->
                oMockup = {
                    name: @newMockup.name
                    file: @newMockup.file
                    image: @newMockup.fileName
                    projectId: localStorage.selectedProject
                }
                socket.emit "mockup.create", oMockup
                @popupIsShowing = false
                @newMockup.name = ""
                @newMockup.file = null

            detectFile: ( e ) ->
                @newMockup.fileName = e.target.files[0].name
                ext = @newMockup.fileName.match(/\.([^\.]+)$/)[1]
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""
                reader = new FileReader()
                reader.onload = ( e ) =>
                    @newMockup.file = e.target.result
                reader.readAsDataURL e.target.files[0]

        events:
            changeProject: ( oTeam, oProject ) ->
                console.log @mockups
                @mockups = []
                socket.emit "mockup.getAll", oProject.uuid

    module.exports = Tasks

</script>
