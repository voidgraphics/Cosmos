Vue = require "vue"
VueRouter = require "vue-router"
VueAsyncData = require "vue-async-data"

SignInView = require "../vues/SignIn.vue"
SignUpView = require "../vues/SignUp.vue"
DeletePopup = require "../vues/DeletePopup.vue"
Popup = require "../vues/Popup.vue"
DashboardView = require "../vues/Dashboard.vue"
TasksView = require "../vues/Tasks.vue"
MockupsView = require "../vues/Mockups.vue"
ChatView = require "../vues/Chat.vue"

Vue.config.debug = false

Vue.use VueRouter
Vue.use VueAsyncData

App = Vue.extend {}

router = new VueRouter()

SignInView  = Vue.component "signin-component", SignInView
SignUpView  = Vue.component "signup-component", SignUpView
DeletePopupView   = Vue.component "delete-popup", DeletePopup
PopupView   = Vue.component "popup", Popup
DashboardView   = Vue.component "dashboard-component", DashboardView
TasksView   = Vue.component "tasks-component", TasksView
MockupsView   = Vue.component "mockups-component", MockupsView
ChatView   = Vue.component "chat-component", ChatView

router.redirect { "/": "/dashboard" }

router.map {
    # '/signin':
    #     component: SignInView
    # '/signup':
    #     component: SignUpView
    '/dashboard':
        component: DashboardView
    '/tasks':
        component: TasksView
    '/mockups':
        component: MockupsView
    '/chat':
        component: ChatView
}

router.start App, "#app"
