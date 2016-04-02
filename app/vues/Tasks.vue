<template src="../html/projecttasks.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Dragula = require "dragula"
    Moment = require "moment"
    Tasks =
        items: []
        data: ->
            return {
                popupIsShowing: false
                deletePopupIsShowing: false
                taskToDelete: null
                columnName: null
                tasks: [ { title: "not loaded yet" } ]
             }

        asyncData: ( resolve, reject ) ->
            socket.emit "task.getAll", ( oReturnedTasks ) ->
                this.items = Object.keys( oReturnedTasks ).map( ( key ) -> return oReturnedTasks[ key ] )
                resolve { tasks: this.items }

        ready: ->
            drake = Dragula( [ document.querySelector( '#todo-column__items' ), document.querySelector( '#progress-column__items' ), document.querySelector( '#finished-column__items' ) ] )
            that = this

            drake.on "drag", ( element ) ->
                # Decrease position of all tasks after the one we're dragging
                iOldPosition = [].indexOf.call element.parentNode.children, element
                index = parseInt element.dataset.id
                column = element.parentNode.parentNode.id

                currentColumnTasks = that.tasks.filter ( task ) ->
                    return ( task.state == column ) && ( task.position >= iOldPosition ) && ( task.id != index )

                for task in currentColumnTasks
                    --task.position

            drake.on "dragend", ( element ) ->
                # Handle new position
                sNewState = element.parentNode.parentNode.id
                index = element.dataset.id
                iNewPosition = [].indexOf.call element.parentNode.children, element

                for task in that.tasks
                    if task.id == index
                        task.state = sNewState
                        task.position = iNewPosition
                        break

                column = element.parentNode.parentNode.id

                currentColumnTasks = that.tasks.filter ( task ) ->
                    return ( task.state == column ) && ( task.position >= iNewPosition ) && ( task.id != index )

                for task in currentColumnTasks
                    ++task.position

                # Send modified tasks to server
                oTasks = that.tasks
                socket.emit "task.saveAll", oTasks

        methods:
            addPopup: ( event ) ->
                column = event.target.parentNode.id

            editPopup: ( event ) ->
                console.log 'editing', event.target.parentNode

            showPopup: ( event )  ->
                this.columnName = event.target.parentNode.id
                this.popupIsShowing = true

            showEditPopup: ( oTask ) ->
                this.taskToEdit = oTask
                this.popupIsShowing = true

            showDeletePopup: ( task ) ->
                this.taskToDelete = task
                this.deletePopupIsShowing = true

            delete: ->
                # Deleting client-side
                this.tasks.$remove( this.taskToDelete )

                # Deleting server-side
                socket.emit "task.delete", this.taskToDelete.id

                this.deletePopupIsShowing = false

        filters:
            formatted: (value) ->
                return Moment(value).fromNow();

        events:
            hidePopup: ->
                this.popupIsShowing = false

            hideDeletePopup: ->
                this.deletePopupIsShowing = false

            confirmDelete: ->
                this.delete()

            submitTask: ( oTask ) ->
                console.log oTask
                oTask.id = zouti.uuid()
                socket.emit "task.save", oTask
                this.tasks.push( oTask )
                for task in this.tasks
                    if task.state == oTask.state && task.id != oTask.id
                        task.position++
                        console.log task.title, task.position

                this.popupIsShowing = false

    module.exports = Tasks

</script>
