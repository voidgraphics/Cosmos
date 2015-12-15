<template src="../html/projecttasks.html"></template>

<script lang="coffee">


    Tasks =
        data: ->
            return { tasks: [ { title: "not loaded yet" } ] }

        asyncData: ( resolve, reject ) ->
            socket.emit "task.getAll", ( aReturnedTasks ) ->
                resolve { tasks: aReturnedTasks }

        methods:
            addPopup: ( event ) ->
                column = event.target.parentNode.id
                console.log column


    module.exports = Tasks

</script>
