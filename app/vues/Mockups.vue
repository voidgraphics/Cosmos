<template src="../html/projectmockups.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Tasks =
        items: []
        data: ->
            return {
                mockups: []
             }

        ready: ->
            socket.emit "mockup.getAll"
            socket.on "mockup.sent", ( oMockup ) =>
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                oMockup.href = "/mockups/#{oMockup.id}"
                @mockups.push oMockup


    module.exports = Tasks

</script>
