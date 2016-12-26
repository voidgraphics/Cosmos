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
                canProceed: false
                fileInputText: 'Click to select an image'
            }

        ready: ->
            socket.on "user.logged", ( oUserData ) =>
                if @canProceed
                    localStorage.id = oUserData.uuid
                    localStorage.username = oUserData.username
                    localStorage.firstname = oUserData.firstname
                    localStorage.lastname = oUserData.lastname
                    @$route.router.go "/joinTeam"
                else
                    this.$dispatch 'error.new', 'There was a problem while creating your account. Please try again.'

        methods:
            register: ->
                if @username && @firstname && @lastname && @email && @password && @file
                    @usernameError = false
                    @emailError = false
                    @firstnameError = false
                    @lastnameError = false
                    @passwordError = false
                    @avatarError = false
                    oUserInfo =
                        username: @username
                        email: @email
                        firstname: @firstname
                        lastname: @lastname
                        password: @password
                        avatar: @fileName
                        file: @file

                    socket.emit "user.register", oUserInfo, ( oResult ) =>
                        if oResult.code == 200
                            @canProceed = true

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
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""
                else
                    if @fileName != ''
                        if @fileName.length > 30
                            @fileInputText = @fileName.substring(0, 30) + '...'
                        else
                            @fileInputText = @fileName
                    else @fileInputText = 'Click to select an image'
                    reader = new FileReader()
                    reader.onload = ( e ) =>
                        @file = e.target.result
                    reader.readAsDataURL e.target.files[0]

    module.exports = SignUp
</script>
