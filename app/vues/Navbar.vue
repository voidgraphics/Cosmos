<template src="../html/navbar.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Vue = require "vue"
    Notifications = require "./Notifications.vue"
    Requests = require "./Requests.vue"
    Errors = require "./Errors.vue"
    Navbar =
        data: ->
            return {
                user: {
                    username: ""
                    src: ""
                    teams: []
                }
                messages: {
                    count: 0
                }
                selectedTeam: {
                    name: ""
                }
                selectedProject: {
                    name: ""
                }
                shownavbar: false
                isUserDropdownVisible: false
                isTeamDropdownVisible: false
                isOffline: false
                isOfflineTooltipVisible: false
            }

        directives:
            focus: (require "vue-focus").focus

        components:
            "notifications": Notifications
            "errors": Errors
            "requests": Requests

        ready: ->

            socket.on "disconnect", () =>
                @isOffline = true

            socket.on "reconnect", () =>
                @isOffline = false

            socket.on "team.initialized", ( oTeam, oProject ) =>
                oTeam.showInput = false
                oTeam.newProject = ""
                @user.teams.push oTeam
                @selectedTeam = oTeam
                localStorage.selectedTeam = oTeam.uuid
                localStorage.selectedProject = oProject.uuid
                @selectedProject = oProject
                socket.emit "user.join", [ @selectedProject.uuid, @selectedTeam.uuid ]

            socket.on "user.logged", ( oUserData ) =>
                setTimeout( () =>
                    if oUserData.teams.length < 1
                        @user.username = oUserData.username
                        @user.src = "data:image/png;base64,#{oUserData.avatar}"
                        @$route.router.go "/joinTeam"
                    else
                        window.starfield.selfDestruct()
                        @$route.router.go "/tasks"
                        @updateUserData oUserData
                , 100 )
            @displayNavbar @$route.path

            socket.on "chat.new", ( message, user ) =>
                if @$route.path isnt "/chat" then @messages.count++

            socket.on "project.new", ( oProject ) =>
                for team in @user.teams
                    if team.uuid == oProject.teamUuid
                        team.projects.push oProject

            socket.on "team.push", ( oTeam ) =>
                @user.teams.push oTeam

            socket.on 'user.updatedAvatar', ( sUserId, file ) =>
                localStorage.avatar = file
                @user.src = "data:image/png;base64,#{file}"

            socket.on 'user.updated', ( oUser ) =>
                @user.username = oUser.username
                localStorage.username = oUser.username
                localStorage.firstname = oUser.firstname
                localStorage.lastname = oUser.lastname

        methods:

            displayNavbar: ( route ) ->
                if route is "/signin" or route is "/signup" or route is "/joinTeam"
                    @shownavbar = false
                else
                    @shownavbar = true

            toggleUserDropdown: ->
                @isUserDropdownVisible = !@isUserDropdownVisible
                navbar = document.getElementById 'navbar'
                if @isUserDropdownVisible
                    navbar.style.zIndex = '99'
                else
                    navbar.style.zIndex = '97'

            toggleTeamDropdown: ->
                @isTeamDropdownVisible = !@isTeamDropdownVisible
                navbar = document.getElementById 'navbar'
                if @isTeamDropdownVisible
                    navbar.style.zIndex = '99'
                else
                    navbar.style.zIndex = '97'

            signout: ->
                previousProject = localStorage.selectedProject
                previousTheme = localStorage.selectedTheme
                localStorage.clear()
                localStorage.previousProject = previousProject
                localStorage.selectedTheme = previousTheme
                @user.username = ""
                @user.teams = []
                @selectedTeam = {name: ""}
                @selectedProject = {name: ""}
                @$route.router.go "/signin"
                @isUserDropdownVisible = false
                @$dispatch 'logout'
                socket.emit 'user.logout'

            updateUserData: ( oUserData ) ->
                @user.username = oUserData.username
                @user.src = "data:image/png;base64,#{oUserData.avatar}"
                teams = oUserData.teams
                for team in teams
                    team.showInput = false
                    team.newProject = ""

                @user.teams = teams
                @selectProject( oUserData )

                socket.emit "user.join", [ @selectedProject.uuid, @selectedTeam.uuid, oUserData.uuid ]

                localStorage.userId = oUserData.uuid
                localStorage.selectedTeam = @selectedTeam.uuid
                localStorage.selectedProject = @selectedProject.uuid
                localStorage.settings = oUserData.settings
                localStorage.email = oUserData.email
                localStorage.avatar = oUserData.avatar
                @isTeamDropdownVisible = false
                this.$dispatch 'userConnected'

            selectProject: ( oUserData ) ->
                @selectedTeam = oUserData.teams[0]
                @selectedProject = @selectedTeam.projects[0]

                for team in oUserData.teams
                    for project in team.projects
                        if project.uuid == localStorage.previousProject
                            @selectedTeam = team
                            @selectedProject = project

            changeProject: ( oTeam, oProject ) ->
                @isTeamDropdownVisible = false
                socket.emit "user.leave", @selectedTeam.uuid
                socket.emit "user.leave", @selectedProject.uuid
                this.$dispatch "changeProject", oTeam, oProject
                this.selectedTeam = oTeam
                this.selectedProject = oProject

            showInput: ( oTeam ) ->
                oTeam.showInput = true

            hideInput: ( oTeam ) ->
                oTeam.showInput = false

            addProject: ( oTeam ) ->
                if oTeam.newProject == "" then return

                project = {
                    name: oTeam.newProject
                    uuid: zouti.uuid()
                    teamId: oTeam.uuid
                }

                socket.emit "project.create", project, ( oResult ) =>
                    oTeam.projects.push oResult
                    oTeam.newProject = ""
                    oTeam.showInput = false

                    socket.emit "user.join", [ oResult.uuid ]

                    @changeProject oTeam, oResult

        events:

            clearUnreadMessageCount: ->
                @messages.count = 0

            navigateToProject: ( oProject ) ->
                oTeam = {}
                for team in @user.teams
                    if team.uuid == oProject.teamUuid
                        oTeam = team
                        break
                @changeProject oTeam, oProject

            leftTeam: ( sTeamId ) ->
                @user.teams.forEach ( oTeam, index ) =>
                    if oTeam.uuid == sTeamId
                        @user.teams.splice index, 1

        watch:
            $route: ( newValue, oldValue ) ->
                @displayNavbar newValue.path
                if @$route.fullPath is "/chat"
                    @messages.count = 0

        filters:
            caseInsensitiveOrderBy: (arr, sortKey, reverse) ->
                if !sortKey then return arr
                order = if reverse && reverse < 0 then -1 else 1
                order = if reverse then -1 else 1

                return arr.slice().sort (a, b) ->
                    if sortKey != '$key'
                        if (Vue.util.isObject(a) && '$value' in a) then a = a.$value
                        if (Vue.util.isObject(b) && '$value' in b) then b = b.$value

                    if Vue.util.isObject(a) then a = Vue.parsers.path.getPath(a, sortKey) else a = a
                    if Vue.util.isObject(b) then b = Vue.parsers.path.getPath(b, sortKey) else b = b

                    a = a.toLowerCase()
                    b = b.toLowerCase()

                    if a == b then return 0 else if a > b then return order else return -order

    module.exports = Navbar
</script>
