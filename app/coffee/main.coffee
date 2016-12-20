ipc =  window.require("electron").ipcRenderer
Vue = require "vue"
VueRouter = require "vue-router"
VueAsyncData = require "vue-async-data"
moment = require "moment"

NavbarView = require "../vues/Navbar.vue"
SignInView = require "../vues/SignIn.vue"
SignUpView = require "../vues/SignUp.vue"
DeletePopup = require "../vues/DeletePopup.vue"
Popup = require "../vues/Popup.vue"
DashboardView = require "../vues/Dashboard.vue"
TasksView = require "../vues/Tasks.vue"
MockupsView = require "../vues/Mockups.vue"
MockupView = require "../vues/Mockup.vue"
ChatView = require "../vues/Chat.vue"
TeamsView = require "../vues/Teams.vue"
JoinTeamView = require "../vues/JoinTeam.vue"
SettingsView = require "../vues/Settings.vue"

Vue.config.debug = true

Vue.use VueRouter
Vue.use VueAsyncData
App = Vue.extend({
    data: ->
        return {
            theme:
                name: ''
                hasSchedule: false
            timer: null
        }

    ready: ->
        @theme.name = localStorage.selectedTheme
        @switchTheme @theme.name
        if localStorage.hasSchedule isnt null
            @theme.hasSchedule = (localStorage.hasSchedule == "true")
        if @theme.hasSchedule then @setCountdownToThemeSwitch()

        #-#-# debugging
        window.change = (number) =>
            if number is 0 then theme = 'dark'
            if number is 1 then theme = 'light'
            @switchTheme(theme)
        #-#-#

        ipc.on 'switchTheme', ( event, sTheme ) =>
            @switchTheme sTheme
            this.$broadcast "themeChanged", sTheme

        ipc.on 'toggleTheme', ( event ) =>
            if @theme.name == 'light' then theme = 'dark'
            else theme = 'light'
            @theme.name = theme
            @switchTheme theme
            this.$broadcast 'themeChanged', theme

        ipc.on 'toggleSchedule', ( event, bHasSchedule ) =>
            @toggleSchedule bHasSchedule

        ipc.on 'navigateToSettings', ( event, sCategory ) =>
            if localStorage.getItem 'userId' then this.$router.go '/settings'

        ipc.on 'toggleColorblind', ( event, bIsColorblind ) =>
            @toggleColorblind bIsColorblind

        ipc.send 'updateSchedule', @theme.hasSchedule

    watch:
        theme: (val, oldVal) ->
            @switchTheme val

    methods:
        switchTheme: ( sTheme ) ->
            document.querySelector('html').className = sTheme
            localStorage.selectedTheme = sTheme
            ipc.send 'updateTheme', sTheme

        handleLocation: ( position ) ->
            console.log position

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

            console.log 'countdown', countdown

            @timer = setTimeout(() =>
                new Notification notificationText.title, { body: notificationText.body, silent: true }
                setTimeout(() =>
                    @switchTheme nextTheme
                    this.$broadcast "themeChanged", nextTheme
                , 500 )
                @setCountdownToThemeSwitch()
            , countdown)

        toggleSchedule: ( bHasSchedule ) ->
            @theme.hasSchedule = bHasSchedule
            localStorage.hasSchedule = bHasSchedule
            if bHasSchedule then @setCountdownToThemeSwitch()
            else clearTimeout @timer
            this.$broadcast "scheduleChanged", bHasSchedule
            ipc.send "updateSchedule", bHasSchedule

        toggleColorblind: ( bIsColorblind ) ->
            if localStorage.settings
                settings = JSON.parse localStorage.settings
                settings.usability.isColorblind = bIsColorblind
                localStorage.settings = JSON.stringify settings
                this.$broadcast "toggleColorblind", bIsColorblind

    events:
        changeProject: ( oTeam, oProject ) ->
            localStorage.selectedProject = oProject.uuid
            localStorage.selectedTeam = oTeam.uuid
            socket.emit "user.join", oProject.uuid, oTeam.uuid
            this.$broadcast "changeProject", oTeam, oProject

        leftTeam: ( sTeamId ) ->
            this.$broadcast "leftTeam", sTeamId

        changeTheme: ( sTheme ) ->
            @switchTheme sTheme

        toggleSchedule: ( bHasSchedule ) ->
            @toggleSchedule bHasSchedule

        toggleColorblind: ( bIsColorblind ) ->
            @toggleColorblind bIsColorblind

        notificationPreferenceChanged: ( sPreferenceName, bIsChecked ) ->
            this.$broadcast "notificationPreferenceChanged", sPreferenceName, bIsChecked

        loadNotificationSettings: ->
            console.log "in main coffee"
            this.$broadcast "test"

        error: ( sErrorMessage ) ->
            this.$broadcast 'newError', sErrorMessage

})


Navbar = Vue.component "navbar", NavbarView
SignInView  = Vue.component "signin-component", SignInView
SignUpView  = Vue.component "signup-component", SignUpView
DeletePopupView   = Vue.component "delete-popup", DeletePopup
PopupView   = Vue.component "popup", Popup
DashboardView   = Vue.component "dashboard-component", DashboardView
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
    '/dashboard':
        component: DashboardView
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

socket.on "connect", () =>
    console.log 'connected'

socket.on "disconnect", () =>
    new Notification "Whoops! Connection lost.", {
        body: "Please wait a moment..."
        silent: true
    }

socket.on "reconnect", () =>
    new Notification "We're good!", {
        body: "Connection to server established."
        silent: true
    }
