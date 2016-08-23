<template src="../html/connect.html"></template>

<script lang="coffee">

    SignIn =
        data: ->
            return {
                username: ""
                password: ""
                usernameError: false
                passwordError: false
            }

        ready: ->
            that = this
            socket.on "user.logged", ( oUserData ) ->
                localStorage.id = oUserData.uuid
                localStorage.username = oUserData.username
                localStorage.firstname = oUserData.firstname
                localStorage.lastname = oUserData.lastname

        methods:
            submit: ->
                if @username && @password
                    socket.emit "user.login", { username: @username, password: @password }
                else
                    if !@username
                        @usernameError = true
                    else
                        @usernameError = false
                    if !@password
                        @passwordError = true
                    else
                        @passwordError = false

    module.exports = SignIn
</script>
