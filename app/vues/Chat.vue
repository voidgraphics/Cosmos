<template src="../html/projectchat.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Moment = require "moment"

    Tasks =
        items: []
        data: ->
            return {
                popupIsShowing: false
                deletePopupIsShowing: false
                taskToDelete: null
                columnName: null
                messages: [ { title: "not loaded yet" } ]
             }

        asyncData: ( resolve, reject ) ->
            socket.emit "chat.getAll", ( oReturnedMessages ) ->
                console.log oReturnedMessages
                this.items = Object.keys( oReturnedMessages ).map( ( key ) -> return oReturnedMessages[ key ] )
                resolve { messages: this.items }

        ready: ->

        methods:
            addPopup: ( event ) ->
                column = event.target.parentNode.id
                console.log column

            editPopup: ( event ) ->
                console.log 'editing', event.target.parentNode

            showPopup: ( event )  ->
                this.columnName = event.target.parentNode.id
                this.popupIsShowing = true

            showEditPopup: ( oTask ) ->
                this.taskToEdit = oTask
                console.log "Editing:", oTask
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

        filters:
            hour: ( value ) ->
                return Moment(value).format('H:mm');

    module.exports = Tasks

</script>
