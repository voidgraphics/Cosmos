<template src="../html/settings.html"></template>

<script lang="coffee">
    Settings =
        items: []
        data: ->
            return {
                newpass: ''
                passwordPopupIsShowing: false
                categories:
                    user: true
                    usability: false
                    notifications: false
                user:
                    username: ''
                    firstname: ''
                    lastname: ''
                    email: ''
                    file: ''
                    fileName: ''
                errors:
                    username: false
                    firstname: false
                    lastname: false
                    avatar: false
                    fileTooBig: false
                    password: false
                settings:
                    usability:
                        theme: "light"
                        hasSchedule: false
                        isColorblind: false
                    notifications:
                        tasksAssigned: false
                        tasksMoved: false
                        tasksEdited: false
                        newComment: false
                        newRequest: false
                        newMessage: false
                        newTargetedMessage: false
                        newChatroom: false
                        newMockup: false

                fileInputText: 'Click to select an image...'
            }

        ready: ->
            @readSettings()

        methods:
            changeTheme: ->
                @$dispatch 'changeTheme', @settings.usability.theme
                socket.emit 'user.settings.write', @settings

            toggleSchedule: () ->
                @$dispatch 'toggleSchedule', @settings.usability.hasSchedule
                socket.emit 'user.settings.write', @settings

            toggleColorblind: () ->
                @$dispatch 'toggleColorblind', @settings.usability.isColorblind
                socket.emit 'user.settings.write', @settings

            switchCategory: ( sCategory ) ->
                for category of @categories
                    @categories[category] = false

                switch sCategory
                    when 'user' then @categories.user = true
                    when 'usability' then @categories.usability = true
                    when 'notifications' then @categories.notifications = true

            changeNotificationPreference: ( sPreferenceName, bIsChecked ) ->
                this.$dispatch "notificationPreferenceChanged", sPreferenceName, bIsChecked
                if localStorage.settings
                    settings = JSON.parse localStorage.settings
                    settings.notifications[sPreferenceName] = bIsChecked
                    localStorage.settings = JSON.stringify settings
                socket.emit 'user.settings.write', @settings

            readSettings: ->
                @user.username = localStorage.username
                @user.firstname = localStorage.firstname
                @user.lastname = localStorage.lastname
                @user.email = localStorage.email
                @user.file = "data:image/png;base64,#{localStorage.avatar}"
                console.log localStorage.settings
                @settings = JSON.parse localStorage.settings

            detectFile: ( e ) ->
                if !e.target.files[0] then return
                if e.target.files[0].size > 2000000
                    @errors.avatar = false
                    return @errors.fileTooBig = true
                else @errors.fileTooBig = false
                @user.fileName = e.target.files[0].name

                ext = (@user.fileName.match(/\.([^\.]+)$/)[1]).toLowerCase()
                if ext != "gif" and ext != "jpeg" and ext != "jpg" and ext != "png"
                    e.target.value = ""
                else
                    if @user.fileName != ''
                        if @user.fileName.length > 25
                            @fileInputText = @user.fileName.substring(0, 25) + '...'
                        else
                            @fileInputText = @user.fileName
                    else @fileInputText = 'Click to select an image...'
                    reader = new FileReader()
                    reader.onload = ( e ) =>
                        @user.file = e.target.result
                    reader.readAsDataURL e.target.files[0]

            saveUserSettings: () ->
                if @user.username == '' then @errors.username = true
                if @user.firstname == '' then @errors.firstname = true
                if @user.lastname == '' then @errors.lastname = true
                if @user.file == ''
                    @errors.avatar = true
                    @errors.fileTooBig = false
                if @errors.username || @errors.firstname || @errors.lastname || @errors.avatar || @errors.fileTooBig
                    form = document.getElementById('userSettings')
                    form.classList.add('popup--shake')
                    setTimeout( () ->
                        form.classList.remove('popup--shake')
                    , 400 )
                    return
                socket.emit 'user.update', {
                    uuid: localStorage.userId
                    username: @user.username
                    firstname: @user.firstname
                    lastname: @user.lastname
                    file: if @user.fileName != '' then @user.file else false
                    avatar: if @user.fileName != '' then @user.fileName else false
                }
            changePassword: ->
                if !@newpass then return @errors.password = true
                else
                    @errors.password = false
                    socket.emit 'user.changePassword', @newpass
                    @passwordPopupIsShowing = false
                    @newpass = ''

        events:
            themeChanged: ( sTheme ) ->
                @settings.usability.theme = sTheme
                socket.emit 'user.settings.write', @settings

            scheduleChanged: ( bHasSchedule ) ->
                @settings.usability.hasSchedule = bHasSchedule
                socket.emit 'user.settings.write', @settings

            toggleColorblind: ( bIsColorblind ) ->
                @settings.usability.isColorblind = bIsColorblind
                socket.emit 'user.settings.write', @settings

    module.exports = Settings

</script>
