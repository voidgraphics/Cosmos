ipc =  window.require("electron").ipcRenderer
Vue = require "vue"
VueRouter = require "vue-router"
VueAsyncData = require "vue-async-data"
moment = require "moment"
Space = require "./space.js"

NavbarView = require "../vues/Navbar.vue"
SignInView = require "../vues/SignIn.vue"
SignUpView = require "../vues/SignUp.vue"
DeletePopup = require "../vues/DeletePopup.vue"
Popup = require "../vues/Popup.vue"
TasksView = require "../vues/Tasks.vue"
MockupsView = require "../vues/Mockups.vue"
MockupView = require "../vues/Mockup.vue"
ChatView = require "../vues/Chat.vue"
TeamsView = require "../vues/Teams.vue"
JoinTeamView = require "../vues/JoinTeam.vue"
SettingsView = require "../vues/Settings.vue"

Vue.config.debug = true


window.init = () ->
    Vue.use VueRouter
    Vue.use VueAsyncData
    App = Vue.extend({
        data: ->
            return {
                settings:
                    usability:
                        theme: "light"
                        hasSchedule: false
                        isColorblind: false
                timer: null
                platform: ''
            }

        ready: ->
            @platform = global.location.search.replace '?platform=', ''
            document.body.className = @platform
            document.querySelector('html').className = 'light'

            #-#-# debugging
            window.change = (number) =>
                if number is 0 then theme = 'dark'
                if number is 1 then theme = 'light'
                @switchTheme(theme)
            #-#-#

            ipc.on 'switchTheme', ( event, sTheme ) =>
                @switchTheme sTheme
                this.$broadcast "themeChanged", sTheme
                socket.emit 'user.settings.write', @settings

            ipc.on 'toggleTheme', ( event ) =>
                if @settings.usability.theme == 'light' then theme = 'dark'
                else theme = 'light'
                @switchTheme theme
                socket.emit 'user.settings.write', @settings
                this.$broadcast 'themeChanged', theme

            ipc.on 'toggleSchedule', ( event, bHasSchedule ) =>
                @toggleSchedule bHasSchedule
                socket.emit 'user.settings.write', @settings

            ipc.on 'navigateToSettings', ( event, sCategory ) =>
                if localStorage.getItem 'userId' then this.$router.go '/settings'

            ipc.on 'toggleColorblind', ( event, bIsColorblind ) =>
                @toggleColorblind bIsColorblind
                socket.emit 'user.settings.write', @settings


        watch:
            theme: (val, oldVal) ->
                @switchTheme val

        methods:
            switchTheme: ( sTheme ) ->
                @settings.usability.theme = sTheme
                document.querySelector('html').className = sTheme
                if localStorage.settings
                    settings = JSON.parse localStorage.settings
                    settings.usability.theme = sTheme
                    localStorage.settings = JSON.stringify settings
                localStorage.selectedTheme = sTheme
                ipc.send 'updateTheme', sTheme

            setCountdownToThemeSwitch: ->
                now = moment()
                lightSwitch = moment().hour( 8 ).minute( 0 ).second( 0 )
                darkSwitch = moment().hour( 20 ).minute( 0 ).second( 0 )

                if now.isBefore lightSwitch
                    countdown = lightSwitch.diff(now);
                    nextTheme = 'light'
                    notificationText = {
                        title: 'Good morning!'
                        body: 'Turning the lights on.'
                    }
                if now.isSameOrAfter lightSwitch
                     countdown = darkSwitch.diff(now)
                     nextTheme = 'dark'
                     notificationText = {
                         title: 'It‘s getting late...'
                         body: 'Turning the lights off.'
                     }
                if now.isSameOrAfter darkSwitch
                    countdown = lightSwitch.add( 1, 'd' ).diff(now)
                    nextTheme = 'light'
                    notificationText = {
                        title: 'Good morning!'
                        body: 'Turning the lights on...'
                    }

                @timer = setTimeout(() =>
                    new Notification notificationText.title, { body: notificationText.body, silent: true }
                    setTimeout(() =>
                        @switchTheme nextTheme
                        this.$broadcast "themeChanged", nextTheme
                    , 500 )
                    @setCountdownToThemeSwitch()
                , countdown)

            toggleSchedule: ( bHasSchedule ) ->
                @settings.usability.hasSchedule = bHasSchedule
                localStorage.hasSchedule = bHasSchedule
                if bHasSchedule then @setCountdownToThemeSwitch()
                else clearTimeout @timer
                this.$broadcast "scheduleChanged", bHasSchedule
                ipc.send "updateSchedule", bHasSchedule


            toggleColorblind: ( bIsColorblind ) ->
                @settings.usability.isColorblind = bIsColorblind
                if localStorage.settings
                    settings = JSON.parse localStorage.settings
                    settings.usability.isColorblind = bIsColorblind
                    localStorage.settings = JSON.stringify settings
                    this.$broadcast "toggleColorblind", bIsColorblind
                    ipc.send "updateColorblind", bIsColorblind

            minimize: ->
                console.log "minimizing"
                ipc.send 'minimize'
            maximize: ->
                console.log "maximizing"
                ipc.send 'maximize'
            close: ->
                console.log "closing"
                ipc.send 'close'
            showMenu: ->
                ipc.send 'showMenu'

        events:
            clearUnreadMessageCount: ->
                @$broadcast 'clearUnreadMessageCount'
            changeProject: ( oTeam, oProject ) ->
                localStorage.selectedProject = oProject.uuid
                localStorage.selectedTeam = oTeam.uuid
                socket.emit "user.join", [ oProject.uuid, oTeam.uuid ]
                this.$broadcast "changeProject", oTeam, oProject

            leftTeam: ( sTeamId ) ->
                this.$broadcast "leftTeam", sTeamId

            logout: ->
                @$broadcast 'logout'

            changeTheme: ( sTheme ) ->
                @switchTheme sTheme

            toggleSchedule: ( bHasSchedule ) ->
                @toggleSchedule bHasSchedule

            toggleColorblind: ( bIsColorblind ) ->
                @toggleColorblind bIsColorblind

            notificationPreferenceChanged: ( sPreferenceName, bIsChecked ) ->
                this.$broadcast "notificationPreferenceChanged", sPreferenceName, bIsChecked

            error: ( sErrorMessage ) ->
                this.$broadcast 'newError', sErrorMessage

            userConnected: ->
                settings = JSON.parse localStorage.settings
                @switchTheme settings.usability.theme
                ipc.send 'updateTheme', @settings.usability.theme

                if settings.usability.hasSchedule isnt null
                    @settings.usability.hasSchedule = settings.usability.hasSchedule
                    ipc.send 'updateSchedule', @settings.usability.hasSchedule
                if @settings.usability.hasSchedule then @setCountdownToThemeSwitch()

                if settings.usability.isColorblind isnt null
                    @toggleColorblind settings.usability.isColorblind
                    ipc.send 'updateColorblind', settings.usability.isColorblind

            setBadge: ( iCount ) ->
                ipc.send 'setBadge', iCount

            bounceIcon: ->
                ipc.send 'bounceIcon'
    })


    Navbar = Vue.component "navbar", NavbarView
    SignInView  = Vue.component "signin-component", SignInView
    SignUpView  = Vue.component "signup-component", SignUpView
    DeletePopupView   = Vue.component "delete-popup", DeletePopup
    PopupView   = Vue.component "popup", Popup
    TasksView   = Vue.component "tasks-component", TasksView
    MockupsView   = Vue.component "mockups-component", MockupsView
    MockupView   = Vue.component "mockup-component", MockupView
    ChatView   = Vue.component "chat-component", ChatView
    TeamsView   = Vue.component "teams-component", TeamsView
    JoinTeamView   = Vue.component "jointeam-component", JoinTeamView
    SettingsView   = Vue.component "settings-component", SettingsView

    router = new VueRouter()
    router.redirect { "/": "/signin" }
    router.map {
        '/signin':
            component: SignInView
        '/signup':
            component: SignUpView
        '/tasks':
            component: TasksView
        '/mockups':
            component: MockupsView
        '/mockups/:id':
            component: MockupView
        '/chat':
            component: ChatView
        '/teams':
            component: TeamsView
        '/joinTeam':
            component: JoinTeamView
        '/settings':
            component: SettingsView
    }

    router.start App, "#app"

    socket.on "disconnect", () =>
        new Notification "Whoops! Connection lost.", {
            body: "Please wait a moment..."
            silent: true
        }

    socket.on "reconnect", () =>
        socket.emit "user.rejoin", localStorage.userId, [ localStorage.selectedProject, localStorage.selectedTeam, localStorage.userId ]
        new Notification "We're good!", {
            body: "Connection to server established."
            silent: true
        }



if typeof io == 'undefined'
    if !window.starfield || !window.starfield.isRunning
        window.starfield = new Space
        window.starfield.animate = () ->
            window.starfield.iAnimationRequestId = window.requestAnimationFrame window.starfield.animate
            window.starfield.render()
        window.starfield.isRunning = true
        window.starfield.animate()
    if navigator.platform != 'Win32'
        document.getElementById('menu').style.display = 'none'
        document.getElementById('captionbutton').style.display = 'none'

    container = document.createElement 'div'
    container.classList.add 'no-server'
    errorMessage = document.createElement 'p'
    errorMessage.classList.add 'no-server__message'
    errorMessage.innerHTML = 'Could not reach server! <br>Retrying in 5 seconds...'
    container.appendChild errorMessage
    document.body.appendChild container
    setTimeout( () =>
        window.location.reload()
    , 5000 )
else
    window.init()
