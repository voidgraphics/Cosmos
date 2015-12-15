<template src="../html/projecttasks.html"></template>

<script lang="coffee">


    Dragula = require "dragula"
    Tasks =
        data: ->
            return { tasks: [ { title: "not loaded yet" } ] }

        asyncData: ( resolve, reject ) ->
            socket.emit "task.getAll", ( aReturnedTasks ) ->
                resolve { tasks: aReturnedTasks }
        ready: ->
            drake = Dragula( [ document.querySelector( '#todo-column__items' ), document.querySelector( '#progress-column__items' ), document.querySelector( '#finished-column__items' ) ] )
            that = this
            drake.on "dragend", ( element ) ->
                sNewState = element.parentNode.parentNode.id
                index = element.dataset.id
                taskToUpdate = null
                for task in that.tasks
                    taskToUpdate = task if task.id == index
                that.tasks[index].state = sNewState
                socket.emit "task.changeState", index, sNewState

        methods:
            addPopup: ( event ) ->
                column = event.target.parentNode.id
                console.log column


    module.exports = Tasks

</script>
