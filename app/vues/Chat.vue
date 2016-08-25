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
                chatrooms: []
                messages: []
                users: []
                selectedChatroom: {
                    uuid: ""
                }
                scrollTip: false
                showForm: false
                newChatroom: ""
            }

        asyncData: ( resolve, reject ) ->
            sProjectId = localStorage.selectedProject
            sTeamId = localStorage.selectedTeam
            socket.emit "chat.getAll", sProjectId, sTeamId, ( aChatrooms, aGeneralMessages, aUsers ) ->
                selected = ""
                for chatroom in aChatrooms
                    chatroom.unreadCount = 0
                    if chatroom.name == "General"
                        selected = chatroom
                resolve {
                    users: aUsers
                    selectedChatroom: selected
                    chatrooms: aChatrooms
                    messages: aGeneralMessages
                }

        detached: ->
            socket.off "chat.new"
            socket.off "user.receiveAvatar"

        ready: ->
            socket.on "chat.new", ( oMessage, oUser ) =>
                oMessage.user = oUser
                if oMessage.chatroomUuid == @selectedChatroom.uuid
                    @messages.push( oMessage )
                else
                    for chatroom in @chatrooms
                        if oMessage.chatroomUuid == chatroom.uuid
                            chatroom.unreadCount++
                # that.handleNotification( oMessage.text, oUser.username )

            socket.on "chat.newChatroom", ( oChatroom ) =>
                oChatroom.unreadCount = 0
                @chatrooms.push oChatroom

            socket.on "user.receiveAvatar", ( oUser ) =>
                for user in @users
                    if user.uuid == oUser.uuid
                        user.avatar = "data:image/png;base64,#{oUser.avatar}"
            @scroll()

        methods:
            addChatroom: () ->
                oChatroom = {
                    uuid: zouti.uuid()
                    projectUuid: localStorage.selectedProject
                    name: @newChatroom
                }

                @showForm = false
                @newChatroom = ""
                socket.emit "chat.createChatroom", oChatroom

            selectChatroom: ( aChatrooms ) ->
                selected = ""
                for chatroom in aChatrooms
                    chatroom.unreadCount = 0
                    if chatroom.name == "General"
                        selected = chatroom
                return selected

            sendMessage: ->
                message =
                    userId: localStorage.id
                    text: @newMessage
                    projectId: localStorage.selectedProject
                    chatroomId: @selectedChatroom.uuid

                socket.emit "chat.newMessage", message
                @newMessage = ""

            scroll: ->
                container = document.getElementsByClassName( "chat__messages" )[0]
                if( container )
                    container.scrollTop = container.scrollHeight

            handleNotification: ( message, username ) ->
                title = "#general - #{username}:"
                notification = new Notification title, { body: message }

            changeChatroom: ( oChatroom ) ->
                @selectedChatroom = oChatroom
                socket.emit "chat.getMessages", oChatroom.uuid, ( aMessages ) =>
                    @messages = aMessages
                    @selectedChatroom.unreadCount = 0

            toggleForm: () ->
                @showForm = !@showForm

            findUserSrc: ( oUser ) ->
                for user in @users
                    id = if typeof oUser is "string" then oUser else oUser.uuid
                    if id == user.uuid then return user.avatar

        events:
            changeProject: ( oTeam, oProject ) ->
                socket.emit "user.join", oProject.uuid
                socket.emit "chat.getAll", oProject.uuid, oTeam.uuid, ( aChatrooms, aGeneralMessages, aUsers ) =>
                    @users = aUsers
                    @chatrooms = aChatrooms
                    @messages = aGeneralMessages
                    @selectedChatroom = @selectChatroom aChatrooms

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

        directives:
            focus: (require "vue-focus").focus
            focusAuto: (require "vue-focus").focusAuto
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
