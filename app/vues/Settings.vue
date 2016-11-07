<template src="../html/settings.html"></template>

<script lang="coffee">
    Settings =
        items: []
        data: ->
            return {
                theme:
                    name: "",
                    hasSchedule: false
                squares: []
            }

        ready: ->
            @theme.name = localStorage.selectedTheme

            if localStorage.hasSchedule isnt null
                @theme.hasSchedule = localStorage.hasSchedule

        methods:
            changeTheme: ->
                @$dispatch 'changeTheme', @theme.name

            toggleSchedule: () ->
                this.$dispatch 'toggleSchedule', @theme.hasSchedule

        events:
            themeChanged: ( sTheme ) ->
                @theme.name = sTheme

    module.exports = Settings

</script>
