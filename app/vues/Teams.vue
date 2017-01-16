<template src="../html/teams.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Moment = require "moment"
    Vue = require "vue"

    Teams =
        items: []
        data: ->
            return {
                teams: []
                searchResults: []
                leavePopupIsShowing: false
                searchPopupIsShowing: false

                leaveTeam: {
                    name: ""
                }
                teamToCreate: {
                    name: ""
                }
                teamToFind: {
                    name: ""
                }

                joinPopupIsShowing: false
            }

        ready: ->
            socket.on "team.push", ( oTeam ) =>
                @teams.push oTeam

            socket.on "team.left", ( sRemovedId ) =>
                @teams.forEach ( oTeam, index ) =>
                    if oTeam.uuid == sRemovedId
                        @teams.splice index, 1
                        @leavePopupIsShowing = false

                console.log @teams.length
                if @teams.length == 0
                    console.log 'redirecting'
                    localStorage.selectedTeam = ''
                    @$router.go '/joinTeam'

            socket.on "team.receiveRequests", ( sTeamId, oUser ) =>
                for team in @teams
                    if team.uuid == sTeamId
                        team.requests.push oUser

            socket.on "team.removeRequest", ( sTeamId, sUserId ) =>
                for oTeam in @teams
                    if oTeam.uuid == sTeamId && oTeam.requests
                        for oRequest, index in oTeam.requests
                            if oRequest.uuid == sUserId
                                oTeam.requests.splice index, 1

        asyncData: ( resolve, reject ) ->
            socket.emit "user.getTeams", localStorage.id, ( aTeams ) ->
                for team in aTeams
                    team.requests = []
                    team.showRequests = false
                resolve {
                    teams: aTeams
                }

        methods:
            showLeavePopup: ( oTeam ) ->
                @leaveTeam = oTeam
                @leavePopupIsShowing = true

            showJoinPopup: ->
                @joinPopupIsShowing = true
                setTimeout( () =>
                    document.getElementById( 'findname' ).focus()
                , 300)

            confirmLeave: ->
                socket.emit "team.leave", @leaveTeam.uuid, localStorage.id
                @.$dispatch "leftTeam", @leaveTeam.uuid

            hidePopup: ( sPopup ) ->
                if sPopup == 'leave'
                    return @leavePopupIsShowing = false
                if sPopup == 'search'
                    return @searchPopupIsShowing = false

            createTeam: ->
                socket.emit "team.create", @teamToCreate.name, localStorage.id
                @joinPopupIsShowing = false
                @teamToCreate.name = ""

            findTeam: ->
                if @teamToFind.name == "" then return
                socket.emit "team.find", @teamToFind.name, localStorage.id, ( aResults, aRequests ) =>
                    @joinPopupIsShowing = false
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
                socket.emit "team.accept", oTeam.uuid, oUser.uuid
                oTeam.requests.forEach ( oRequest, index ) =>
                    if oRequest.uuid == oUser.uuid
                        oTeam.requests.splice index, 1
                        if oTeam.requests.length == 0
                            oTeam.showRequests = false


        events:
            changeProject: ( oTeam, oProject ) ->
                # socket.emit "user.join", [ oProject.uuid ]



    module.exports = Teams

</script>
