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
                fileName: ""
                file: ""
                usernameError: false
                emailError: false
                firstnameError: false
                lastnameError: false
                passwordError: false
                avatarError: false
                usernameTaken: false
            }

        ready: ->
            socket.on "user.logged", ( oUserData ) =>
                localStorage.id = oUserData.uuid
                localStorage.username = oUserData.username
                localStorage.firstname = oUserData.firstname
                localStorage.lastname = oUserData.lastname
                @$route.router.go "/joinTeam"

        methods:
            register: ->
                if @username && @firstname && @lastname && @email && @password && @file
                    @usernameError = false
                    @emailError = false
                    @firstnameError = false
                    @lastnameError = false
                    @passwordError = false
                    @avatarError = false
                    console.log "Registering #{@username}..."
                    oUserInfo =
                        username: @username
                        email: @email
                        firstname: @firstname
                        lastname: @lastname
                        password: @password
                        avatar: @fileName
                        file: @file

                    socket.emit "user.register", oUserInfo, ( oResult ) =>
                        console.log oResult
                        if oResult.code == 200
                            console.log "log you in here"

                        if oResult.code == 500
                            if oResult.error == "SequelizeUniqueConstraintError"
                                @usernameError
                                @usernameTaken = true

                else
                    if !@username
                        @usernameError = true
                    else
                        @usernameError = false
                    if !@email
                        @emailError = true
                    else
                        @emailError = false
                    if !@firstname
                        @firstnameError = true
                    else
                        @firstnameError = false
                    if !@lastname
                        @lastnameError = true
                    else
                        @lastnameError = false
                    if !@password
                        @passwordError = true
                    else
                        @passwordError = false
                    if !@avatar
                        @avatarError = true
                    else
                        @avatarError = false

            detectFile: ( e ) ->
                @fileName = e.target.files[0].name
                ext = @fileName.match(/\.([^\.]+)$/)[1]
                console.log ext
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""

                reader = new FileReader()
                reader.onload = ( e ) =>
                    @file = e.target.result
                console.log e.target.files
                reader.readAsDataURL e.target.files[0]

    module.exports = SignUp
</script>
