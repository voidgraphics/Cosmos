Vue = require "vue"
VueRouter = require "vue-router"

Vue.use VueRouter

App = Vue.extend {}

router = new VueRouter()

SignInView  = Vue.component "signin-component", { template: "#view-signin" }
SignUpView  = Vue.component "signup-component", { template: "#view-signup" }
TasksView   = Vue.component "tasks-component", { template: "#view-projecttasks" }

router.redirect { "/": "/tasks" }

router.map {
    '/signin':
        component: SignInView
    '/signup':
        component: SignUpView
    '/tasks':
        component: TasksView
}

router.start App, "#app"
