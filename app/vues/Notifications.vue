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
                    tasksAssigned: true
                    tasksMoved: true
            }
        ready: ->

            socket.emit "notifications.fetch", localStorage.userId, ( aNotifications ) =>
                @checkUnread aNotifications
                @notifications = aNotifications

            socket.on "notification.task.created", ( oNotification ) =>
                if @settings['tasksAssigned'] then @addNotification oNotification

            socket.on "notification.task.moved", ( oNotification ) =>
                if @settings['tasksMoved'] then @addNotification oNotification

        methods:

            navigate: ( oProject ) ->
                this.$dispatch "navigateToProject", oProject
                @isPanelShowing = false

            read: ->
                for notification in @notifications
                    if !notification.read
                        notification.read = true
                        socket.emit "notifications.read", notification.uuid
                @unread = 0

            togglePanel: ->
                @isPanelShowing = !@isPanelShowing
                if @isPanelShowing then @read()

            addNotification: ( oNotification ) ->
                new Notification oNotification.project.name, { body: oNotification.text, silent: true }
                @unread++
                @notifications.unshift oNotification

            checkUnread: ( aNotifications ) ->
                for notification in aNotifications
                    if !notification.read
                        @unread++

        events:
            notificationPreferenceChanged: ( sPreferenceName, bIsChecked ) ->
                @settings[sPreferenceName] = bIsChecked
        filters:
            formatted: ( value ) ->
                return Moment(value).format('ll h:mm a');

    module.exports = Notifications
</script>
