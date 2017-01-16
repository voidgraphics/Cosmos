<template src="../html/notifications.html"></template>

<script lang="coffee">
    Moment = require "moment"
    Notifications =
        data: ->
            return {
                unread: 0
                notifications: []
                isPanelShowing: false
                settings:
                    tasksAssigned: false
                    tasksMoved: false
                    tasksEdited: false
                    newMockup: false
                    newComment: false
                    newMessage: false
                    newTargetedMessage: false
                    newChatroom: false
                    newRequest: false
            }
        ready: ->
            @loadSettings()

            socket.on 'notification.flash', ( sTitle, sBody ) =>
                new Notification sTitle, { body: sBody, silent: true }

            socket.emit "notifications.fetch", localStorage.userId, ( aNotifications ) =>
                @checkUnread aNotifications
                @notifications = aNotifications

            socket.on "notification.task.created", ( oNotification ) =>
                if @settings['tasksAssigned'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.task.moved", ( oNotification ) =>
                if @settings['tasksMoved'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.task.edited", ( oNotification ) =>
                if @settings['tasksEdited'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.mockup.new", ( oNotification ) =>
                if @settings['newMockup'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.comment.created", ( oNotification ) =>
                if @settings['newComment'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.message.new", ( oNotification ) =>
                if @settings['newMessage'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.message.targeted", ( oNotification ) =>
                if @settings['newTargetedMessage']
                    @addNotification oNotification
                    @$dispatch 'bounceIcon'
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.chatroom.new", ( oNotification ) =>
                if @settings['newChatroom'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "notification.request.new", ( oNotification ) =>
                if @settings['newRequest'] then @addNotification oNotification
                else socket.emit "notifications.read", oNotification.id

            socket.on "user.logout"

        methods:
            loadSettings: ->
                if localStorage.settings
                    settings = JSON.parse localStorage.settings
                    @settings = settings.notifications

            navigate: ( oProject ) ->
                this.$dispatch "navigateToProject", oProject
                @isPanelShowing = false

            read: ->
                for notification in @notifications
                    if !notification.read
                        notification.read = true
                        socket.emit "notifications.read", notification.uuid
                @unread = 0
                @$dispatch 'setBadge', 0

            togglePanel: ->
                @isPanelShowing = !@isPanelShowing
                if @isPanelShowing then @read()

            addNotification: ( oNotification ) ->
                new Notification oNotification.project.name, { body: oNotification.text, silent: true }
                @unread++
                @$dispatch 'setBadge', @unread
                @notifications.unshift oNotification

            checkUnread: ( aNotifications ) ->
                for notification in aNotifications
                    if !notification.read
                        @unread++
                @$dispatch 'setBadge', @unread

        events:
            notificationPreferenceChanged: ( sPreferenceName, bIsChecked ) ->
                @settings[sPreferenceName] = bIsChecked

            logout: ->
                socket.removeAllListeners 'notification.flash'
                socket.removeAllListeners 'notification.task.created'
                socket.removeAllListeners 'notification.task.moved'
                socket.removeAllListeners 'notification.task.edited'
                socket.removeAllListeners 'notification.mockup.new'
                socket.removeAllListeners 'notification.comment.created'
                socket.removeAllListeners 'notification.message.new'
                socket.removeAllListeners 'notification.chatroom.new'
                socket.removeAllListeners 'notification.request.new'
        filters:
            formatted: ( value ) ->
                return Moment(value).format('ll h:mm a');

    module.exports = Notifications
</script>
