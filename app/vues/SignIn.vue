<template src="../html/connect.html"></template>

<script lang="coffee">

    Space = require '../js/space.js'

    SignIn =
        data: ->
            return {
                username: ""
                password: ""
                usernameError: false
                passwordError: false
                wronginfo: false
                resetPopupIsShowing: false
                resetEmail: ''
            }

        ready: ->
            document.getElementById('username').focus()
            if !window.starfield || !window.starfield.isRunning
                window.starfield = new Space
                window.starfield.animate = () ->
                    window.starfield.iAnimationRequestId = window.requestAnimationFrame window.starfield.animate
                    window.starfield.render()
                window.starfield.isRunning = true
                window.starfield.animate()

            socket.on "user.logged", ( oUserData ) ->
                localStorage.id = oUserData.uuid
                localStorage.username = oUserData.username
                localStorage.firstname = oUserData.firstname
                localStorage.lastname = oUserData.lastname
                localStorage.settings = oUserData.settings
                localStorage.email = oUserData.email

            socket.on 'user.notlogged', () =>
                @wronginfo = true

        methods:
            submit: ->
                if @username && @password
                    socket.emit "user.login", { username: @username, password: @password }
                    @usernameError = false
                    @passwordError = false
                else
                    if !@username
                        @usernameError = true
                    else
                        @usernameError = false
                    if !@password
                        @passwordError = true
                    else
                        @passwordError = false

            showPwReset: ->
                @resetPopupIsShowing = true
                setTimeout( =>
                    document.getElementById( 'email' ).focus()
                , 200 )

            resetPassword: ->
                if !@resetEmail then return
                socket.emit 'user.resetPassword', @resetEmail
                new Notification 'We sent you an e-mail', { body: 'Check your inbox!', silent: true }
                @resetPopupIsShowing = false
                @resetEmail = ''

    module.exports = SignIn
</script>
