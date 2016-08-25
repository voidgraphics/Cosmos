<template src="../html/jointeam.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Moment = require "moment"
    Vue = require "vue"

    JoinTeam =
        items: []
        data: ->
            return {
                teams: []
                searchResults: []
                requests: []
                projectPopupIsShowing: false
                searchPopupIsShowing: false
                projectToCreate: {
                    name: ""
                }
                teamToCreate: {
                    name: ""
                }
                teamToFind: {
                    name: ""
                }
            }

        ready: ->
            socket.on "team.push", ( oTeam ) =>
                @teams.push oTeam

            socket.on "team.left", ( sRemovedId ) =>
                @teams.forEach ( oTeam, index ) =>
                    if oTeam.uuid == sRemovedId
                        @teams.splice index, 1
                        @leavePopupIsShowing = false

            socket.on "team.receiveRequests", ( sTeamId, oUser ) =>
                for team in @teams
                    if team.uuid == sTeamId
                        team.requests.push oUser

            socket.on "team.removeRequest", ( sTeamId, sUserId ) ->
                for oTeam in @teams
                    if oTeam.uuid == sTeamId
                        oTeam.requests.forEach( oRequest, index ) =>
                            if oRequest.uuid == sUserId
                                oTeam.requests.splice index, 1

            socket.on "team.initialized", ( oTeam, oProject ) =>
                # @.$dispatch "changeProject", oTeam, oProject
                @$route.router.go "/tasks"

        methods:
            showLeavePopup: ( oTeam ) ->
                @leaveTeam = oTeam
                @leavePopupIsShowing = true

            confirmLeave: ->
                socket.emit "team.leave", @leaveTeam.uuid, localStorage.id

            hidePopup: ( sPopup ) ->
                if sPopup == 'leave'
                    return @leavePopupIsShowing = false
                if sPopup == 'search'
                    return @searchPopupIsShowing = false

            createTeam: ->
                oTeam = {
                    name: @teamToCreate.name
                    userUuid: localStorage.id
                }
                oProject = {
                    name: @projectToCreate.name
                }
                socket.emit "team.createAndProject", oTeam, oProject
                @teamToCreate.name = ""
                @projectToCreate.name = ""

            findTeam: ->
                if @teamToFind.name == "" then return
                socket.emit "team.find", @teamToFind.name, localStorage.id, ( aResults, aRequests ) =>
                    @requests = aRequests
                    @searchPopupIsShowing = true
                    for result in aResults
                        result.status = ""
                        for request in aRequests
                            if request.teamUuid == result.uuid
                                result.status = "Request sent!"
                        for team in @teams
                            if team.uuid == result.uuid
                                result.status = "Already joined"
                    @searchResults = aResults

            joinTeam: ( oTeam ) ->
                socket.emit "team.request", localStorage.id, oTeam.uuid, ( oResult ) =>
                    if oResult
                        oTeam.status = "Request sent!"

            acceptRequest: ( oTeam, oUser ) ->
                console.log "accepting #{oTeam.name} #{oUser.username}"
                socket.emit "team.accept", oTeam.uuid, oUser.uuid
                oTeam.requests.forEach ( oRequest, index ) =>
                    if oRequest.uuid == oUser.uuid
                        oTeam.requests.splice index, 1
                        if oTeam.requests.length == 0
                            oTeam.showRequests = false


        events:
            changeProject: ( oTeam, oProject ) ->
                socket.emit "user.join", oProject.uuid, oTeam.uuid



    module.exports = JoinTeam

</script>
