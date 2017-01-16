<template src="../html/requests.html"></template>

<script lang="coffee">
    Moment = require 'moment'
    Requests =
        data: ->
            return {
                requests: []
                isPanelShowing: false
            }
        ready: ->
            socket.on "request.new", ( oRequest ) =>
                @requests.push oRequest
                new Notification oRequest.team.name, { body: oRequest.user.username + ' wants to join your team!', silent: true }

            socket.on 'request.removed', ( sRequestId ) =>
                for oRequest in @requests
                    if oRequest.uuid == sRequestId
                        @requests.$remove oRequest

            socket.emit "team.getRequests", localStorage.selectedTeam, ( aRequests ) =>
                @requests = aRequests

            socket.on "request.addAvatar", ( sRequestId, sAvatar ) =>
                for oRequest in @requests
                    if oRequest.uuid == sRequestId
                        oRequest.user.avatar = "data:image/png;base64,#{sAvatar}"

        methods:
            acceptRequest: ( oRequest ) ->
                socket.emit "team.accept", oRequest.team.uuid, oRequest.user.uuid
                @requests.$remove oRequest
                if @requests.length == 0 then @isPanelShowing = false

            removeRequest: ( oRequest ) ->
                socket.emit "team.removeRequest", oRequest.uuid, oRequest.team.uuid
                @requests.$remove oRequest
                if @requests.length == 0 then @isPanelShowing = false

    module.exports = Requests
</script>
