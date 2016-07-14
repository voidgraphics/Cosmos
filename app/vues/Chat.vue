<template src="../html/projectchat.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Moment = require "moment"
    Vue = require "vue"

    Chat =
        items: []
        data: ->
            return {
                newMessage: ""
                messages: []
                scrollTip: false
             }

        asyncData: ( resolve, reject ) ->
            socket.emit "chat.getAll", ( oReturnedMessages ) ->
                this.items = Object.keys( oReturnedMessages ).map( ( key ) -> return oReturnedMessages[ key ] )
                resolve { messages: this.items }

        ready: ->
            that = this
            socket.on "chat.new", ( message, user ) ->
                message.user = user
                that.messages.push( message )
            @scroll()

        methods:
            sendMessage: ->
                message =
                    userId: "60c63097-6ce9-41a4-a1b0-a361597c2bc8"
                    text: @newMessage

                socket.emit "chat.newMessage", message
                @newMessage = ""

            scroll: ->
                container = document.getElementsByClassName( "chat__messages" )[0]
                if( container )
                    container.scrollTop = container.scrollHeight


        filters:
            hour: ( value ) ->
                return Moment(value).format('H:mm');

        directives:
            scrolldown: ->
                container = document.getElementsByClassName( "chat__messages" )[0]
                if container && container.scrollTop == ( container.scrollHeight - container.offsetHeight )
                    Vue.nextTick( ->
                        container.scrollTop = container.scrollHeight
                    )
                else
                    # TODO: Show scroll tip

    module.exports = Chat

</script>
