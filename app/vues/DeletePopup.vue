<template src="../html/deletepopup.html"></template>

<script lang="coffee">

    Moment = require 'moment'

    module.exports = DeletePopup =

    props: [ 'task', 'isColorblind', 'users', 'categories' ]

    methods:
        confirmDelete: ->
            this.$dispatch "confirmDelete"

        hidePopup: ->
            this.$dispatch "hideDeletePopup"

        findUserSrc: ( oUser ) ->
            for user in @users
                id = if typeof oUser is "string" then oUser else oUser.uuid || oUser.id
                if id == user.uuid
                    return user.src

        showState: ( sState ) ->
            if sState == 'todo' then return 'To do'
            if sState == 'inprogress' then return 'In progress'
            if sState == 'finished' then return 'Completed'

    filters:
        formatted: ( value ) ->
            return Moment(value).fromNow();

</script>
