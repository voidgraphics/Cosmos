<template src="../html/popup.html">
</template>

<script lang="coffee">
    Pikaday = require "pikaday"
    Moment = require "moment"
    picker = null

    module.exports = Popup =

        data: ->
            return {
                deadline: ""
                taskName: ""
                users: []
                hasDeadline: false
                state: ""
                hasDeleteButton: false
            }

        props: [ "columnname", "task" ]

        ready: ->
            if( @task )
                this.taskName = @task.title
                this.deadline = @task.deadline
                this.users = @task.users
                this.hasDeadline = @task.deadline != ""
                this.hasDeleteButton = true
            else
                this.hasDeleteButton = false

            field = this.$els.datepicker
            that = this
            picker = new Pikaday( {
                minDate: new Date(),
                onSelect: ( date ) ->
                    field.value = picker.getMoment().format "YYYY-MM-DD"
                    that.hasDeadline = true
                    that.deadline = picker.getMoment().format "YYYY-MM-DD"
            } )
            this.state = this.columnname

            field.parentNode.insertBefore( picker.el, field.nextSibling )


        methods:
            hidePopup: ->
                @task = null
                this.$dispatch "hidePopup"

            clearDeadline: ( event ) ->
                if event.target.checked == false
                    this.deadline = ""
                else
                    this.deadline = picker.getMoment().format "YYYY-MM-DD"

            submitTask: ( event ) ->
                event.preventDefault()
                oTask =
                    title: @taskName
                    deadline: @deadline
                    users: @users
                    state: @state
                    position: 0

                this.$dispatch "submitTask", oTask

            deleteTask: ( event ) ->
                event.preventDefault()
                this.$dispatch "hidePopup"
                this.$dispatch "showDelete", @task

        filters:
            dateFromNow: ( value ) ->
                Moment( value ).fromNow()

            dateForHumans: ( value ) ->
                Moment().format( 'll' )
</script>
