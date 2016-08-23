Vue = require "vue"
VueRouter = require "vue-router"
VueAsyncData = require "vue-async-data"

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

Vue.config.debug = true

Vue.use VueRouter
Vue.use VueAsyncData
App = Vue.extend({
    events:
        changeProject: ( oTeam, oProject ) ->
            localStorage.selectedProject = oProject.uuid
            localStorage.selectedTeam = oTeam.uuid
            this.$broadcast "changeProject", oTeam, oProject
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
}

router.start App, "#app"
