<template src="../html/projectmockups.html"></template>

<script lang="coffee">
    Vue = require "vue"
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
                # @newMockup.file = null

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
                @mockups = []
                socket.emit "mockup.getAll", oProject.uuid

        filters:
            caseInsensitiveOrderBy: (arr, sortKey, reverse) ->
                if !sortKey then return arr
                order = if reverse && reverse < 0 then -1 else 1
                order = if reverse then -1 else 1

                return arr.slice().sort (a, b) ->
                    if sortKey != '$key'
                        if (Vue.util.isObject(a) && '$value' in a) then a = a.$value
                        if (Vue.util.isObject(b) && '$value' in b) then b = b.$value

                    if Vue.util.isObject(a) then a = Vue.parsers.path.getPath(a, sortKey) else a = a
                    if Vue.util.isObject(b) then b = Vue.parsers.path.getPath(b, sortKey) else b = b

                    a = a.toLowerCase()
                    b = b.toLowerCase()

                    if a == b then return 0 else if a > b then return order else return -order

    module.exports = Tasks

</script>
