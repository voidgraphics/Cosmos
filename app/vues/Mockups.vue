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
                newMockupNameError: false
                newMockupFileError: false
                fileTooBigError: false

                fileInputText: 'Click to select an image...'
             }

        ready: ->
            socket.emit "mockup.getAll", localStorage.selectedProject
            socket.removeAllListeners "mockup.removed"
            socket.removeAllListeners "mockup.sent"
            socket.removeAllListeners "comment.sent"
            socket.on "mockup.removed", @removeMockup
            socket.on "mockup.sent", @pushMockup
            socket.on "comment.sent", @incrementComment

        methods:
            togglePopup: ->
                @popupIsShowing = !@popupIsShowing

            removeMockup: ( sMockupId ) ->
                for index, mockup of @mockups
                    if mockup.uuid == sMockupId
                        @mockups.$remove mockup


            pushMockup: ( oMockup, iCommentCount ) ->
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                oMockup.href = "/mockups/#{oMockup.id}"
                oMockup.commentCount = iCommentCount
                @mockups.push oMockup

            incrementComment: ( oComment ) ->
                for mockup in @mockups
                    if mockup.uuid == oComment.mockup.uuid then return mockup.commentCount++

            addMockup: ->
                @newMockupNameError = @newMockup.name == ''
                @newMockupFileError = !@newMockup.file
                if @newMockupFileError then @fileTooBigError = false
                if @newMockupNameError || @newMockupFileError || @fileTooBigError
                    popup = document.getElementById('popup')
                    popup.classList.add('popup--shake')
                    setTimeout( () ->
                        popup.classList.remove('popup--shake')
                    , 400 )
                    return

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
                @fileInputText = 'Click to select an image...'

            detectFile: ( e ) ->
                if !e.target.files[0] then return
                if e.target.files[0].size > 2000000
                    @newMockupFileError = false
                    return @fileTooBigError = true
                else @fileTooBigError = false
                @newMockup.fileName = e.target.files[0].name

                ext = (@newMockup.fileName.match(/\.([^\.]+)$/)[1]).toLowerCase()
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""
                else
                    if @newMockup.fileName != ''
                        if @newMockup.fileName.length > 50
                            @fileInputText = @newMockup.fileName.substring(0, 50) + '...'
                        else
                            @fileInputText = @newMockup.fileName
                    else @fileInputText = 'Click to select an image...'
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
