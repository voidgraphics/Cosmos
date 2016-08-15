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
            sProjectId = localStorage.getItem('selectedProject')
            console.log sProjectId
            socket.emit "chat.getAll", sProjectId, ( oReturnedMessages ) ->
                this.items = Object.keys( oReturnedMessages ).map( ( key ) -> return oReturnedMessages[ key ] )
                resolve { messages: this.items }

        ready: ->
            that = this
            socket.on "chat.new", ( message, user ) ->
                message.user = user
                that.messages.push( message )
                # that.handleNotification( message.text, user.username )
            @scroll()

        methods:
            sendMessage: ->
                message =
                    userId: localStorage.id
                    text: @newMessage
                    projectId: localStorage.selectedProject


                socket.emit "chat.newMessage", message
                @newMessage = ""

            scroll: ->
                container = document.getElementsByClassName( "chat__messages" )[0]
                if( container )
                    container.scrollTop = container.scrollHeight

            handleNotification: ( message, username ) ->
                title = "#general - #{username}:"
                notification = new Notification title, { body: message }

        events:
            changeProject: ( oTeam, oProject ) ->
                socket.emit "chat.getAll", oProject.uuid, ( aMessages ) =>
                    @messages = aMessages

        filters:
            hour: ( value ) ->
                return Moment(value).format('H:mm');

            format: ( text ) ->
                # Check for underscores
                text = text.replace /(_).[^\*]*(_)/g, ( text, p1, p2 ) ->
                    if( p1 && p2 )
                        return "<em>#{text.split('_').join('')}</em>"

                # Check for asterisks
                text = text.replace /(\*).[^\_]*(\*)/g, ( text, p1, p2 ) ->
                    if( p1 && p2 )
                        return "<strong>#{text.split('*').join('')}</strong>"

                return text

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
