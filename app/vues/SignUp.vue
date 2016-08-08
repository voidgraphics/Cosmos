<template src="../html/signup.html"></template>

<script lang="coffee">

    SignUp =
        data: ->
            return {
                username: ""
                email: ""
                firstname: ""
                lastname: ""
                password: ""
            }

        methods:
            register: ->
                if @username && @email && @password
                    console.log "Registering #{@username}..."
                    oUserInfo =
                        username: @username
                        email: @email
                        firstname: @firstname
                        lastname: @lastname
                        password: @password

                    socket.emit "user.register", oUserInfo, ( oResult ) ->
                        console.log oResult

                else
                    console.error "Missing info"

    module.exports = SignUp
</script>
