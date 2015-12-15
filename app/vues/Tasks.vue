<template src="../html/projecttasks.html"></template>

<script lang="coffee">
    Dragula = require "dragula"
    Tasks =
        items: []
        data: ->
            return {
                popupIsShowing: false
                taskToDelete: null
                tasks: [ { title: "not loaded yet" } ]
             }

        asyncData: ( resolve, reject ) ->
            socket.emit "task.getAll", ( oReturnedTasks ) ->
                this.items = Object.keys( oReturnedTasks ).map( ( key ) -> return oReturnedTasks[ key ] )
                resolve { tasks: this.items }

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

            editPopup: ( event ) ->
                console.log 'editing', event.target.parentNode

            showDeletePopup: ( event ) ->
                id = parseInt event.target.parentNode.dataset.id
                this.taskToDelete = id
                this.popupIsShowing = true

            delete: ->
                # Deleting client-side
                id = this.taskToDelete
                taskToDelete = null
                for task in this.tasks
                    taskToDelete = task if task.id == id
                index = this.tasks.indexOf( taskToDelete )
                this.tasks.splice( index, 1 )

                # Deleting server-side
                socket.emit "task.delete", id

                this.popupIsShowing = false

        events:
            hidePopup: ->
                this.popupIsShowing = false

            confirmDelete: ->
                this.delete()

    module.exports = Tasks

</script>
