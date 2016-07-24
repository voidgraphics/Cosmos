<template src="../html/projectmockups.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Tasks =
        items: []
        data: ->
            return {
                mockups: []
             }

        # asyncData: ( resolve, reject ) ->
            # socket.emit "mockup.getAll", ( oReturnedMockups ) ->
            #     this.items = Object.keys( oReturnedMockups ).map( ( key ) -> return oReturnedMockups[ key ] )
            #     resolve { tasks: this.items }

        ready: ->
            socket.emit "mockup.getAll"
            that = this
            socket.on "mockup.sent", ( oMockup ) ->
                console.log oMockup
                oMockup.src = "data:image/png;base64,#{oMockup.image}"
                that.mockups.push oMockup


    module.exports = Tasks

</script>
