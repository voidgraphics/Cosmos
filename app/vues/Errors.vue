<template src="../html/errors.html"></template>

<script lang="coffee">
    Errors =
        data: ->
            return {
                isShowing: false
                message: 'This is an example error message'
                uptime: 6000
                isHoveringErrorMessage: false
            }

        ready: ->
            socket.on "error.new", @showError

        methods:
            showError: ( sErrorMessage ) ->
                @message = sErrorMessage
                @isShowing = true
                @startCounting()

            startCounting: ->
                setTimeout( () =>
                    if @isHoveringErrorMessage then @startCounting()
                    else @isShowing = false
                , @uptime )

        events:
            newError: ( sErrorMessage ) ->
                @showError sErrorMessage

    module.exports = Errors
</script>
