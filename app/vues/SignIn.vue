<template src="../html/connect.html"></template>

<script lang="coffee">

    SignIn =
        data: ->
            return {
                username: ""
                password: ""
                usernameError: ""
                passwordError: ""
            }

        ready: ->
            that = this
            socket.on "user.logged", ( oUserData ) ->
                localStorage.id = oUserData.uuid
                localStorage.username = oUserData.username
                localStorage.firstname = oUserData.firstname
                localStorage.lastname = oUserData.lastname

                that.$route.router.go "/tasks"

        methods:
            submit: ->
                if @username && @password
                    socket.emit "user.login", { username: @username, password: @password }
                else
                    if !@username
                        @usernameError = "Please enter your username"
                    else
                        @usernameError = ""
                    if !@password
                        @passwordError = "Please enter your password"
                    else
                        @passwordError = ""

    module.exports = SignIn
</script>
