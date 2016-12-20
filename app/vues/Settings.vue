<template src="../html/settings.html"></template>

<script lang="coffee">
    Settings =
        items: []
        data: ->
            return {
                theme:
                    name: ""
                    hasSchedule: false
                    isColorblind: false
                categories:
                    usability: true
                    notifications: false
                notifs:
                    tasksAssigned: false
                    tasksMoved: false
            }

        ready: ->
            @theme.name = localStorage.selectedTheme

            @readSettings()

        methods:
            changeTheme: ->
                @$dispatch 'changeTheme', @theme.name

            toggleSchedule: () ->
                this.$dispatch 'toggleSchedule', @theme.hasSchedule

            toggleColorblind: () ->
                this.$dispatch 'toggleColorblind', @theme.isColorblind

            switchCategory: ( sCategory ) ->
                for category of @categories
                    @categories[category] = false

                switch sCategory
                    when 'usability' then @categories.usability = true
                    when 'notifications' then @categories.notifications = true

            changeNotificationPreference: ( sPreferenceName, bIsChecked ) ->
                this.$dispatch "notificationPreferenceChanged", sPreferenceName, bIsChecked

            readSettings: ->
                settings = JSON.parse localStorage.settings
                console.log settings
                @notifs.tasksAssigned = settings.notifications.tasksAssigned
                @notifs.tasksMoved = settings.notifications.tasksMoved
                @theme.name = settings.usability.theme
                @theme.hasSchedule = settings.usability.hasSchedule
                @theme.isColorblind = settings.usability.isColorblind
                console.log @theme

        events:
            themeChanged: ( sTheme ) ->
                @theme.name = sTheme

            scheduleChanged: ( bHasSchedule ) ->
                @theme.hasSchedule = bHasSchedule

    module.exports = Settings

</script>
