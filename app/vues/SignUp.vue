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
                fileTooBigError: false
                canProceed: false
                fileInputText: 'Click to select an image...'
            }

        ready: ->
            document.getElementById('usernamea').focus()
            socket.on "user.logged", ( oUserData ) =>
                if @canProceed
                    localStorage.id = oUserData.uuid
                    localStorage.userId = oUserData.uuid
                    localStorage.username = oUserData.username
                    localStorage.firstname = oUserData.firstname
                    localStorage.lastname = oUserData.lastname
                    localStorage.email = oUserData.email
                    localStorage.avatar = oUserData.avatar
                    localStorage.settings = oUserData.settings
                    @$route.router.go "/joinTeam"
                else
                    this.$dispatch 'error.new', 'There was a problem while creating your account. Please try again.'

        methods:
            register: ->
                if @username && @firstname && @lastname && @email && @password && @file && !@fileTooBigError
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
                    if !@file
                        @avatarError = true
                        @fileTooBigError = false
                    else
                        @avatarError = false

            detectFile: ( e ) ->
                if !e.target.files[0] then return
                if e.target.files[0].size > 2000000
                    @avatarError = false
                    return @fileTooBigError = true
                else @fileTooBigError = false
                @fileName = e.target.files[0].name

                ext = (@fileName.match(/\.([^\.]+)$/)[1]).toLowerCase()
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""
                else
                    if @fileName != ''
                        if @fileName.length > 25
                            @fileInputText = @fileName.substring(0, 25) + '...'
                        else
                            @fileInputText = @fileName
                    else @fileInputText = 'Click to select an image...'
                    reader = new FileReader()
                    reader.onload = ( e ) =>
                        @file = e.target.result
                    reader.readAsDataURL e.target.files[0]

    module.exports = SignUp
</script>
