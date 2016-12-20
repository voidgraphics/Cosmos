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
                selectedUsers: []
                hasDeadline: false
                state: ""
                hasDeleteButton: false
                tag: ""
                hasError: false
                tags: [
                    "None",
                    "Design",
                    "Front-end",
                    "Back-end",
                    "Planning",
                    "Testing",
                    "Bugs"
                ]
                tagListIsShowing: false
                states:
                    "todo": "To do"
                    "inprogress": "In progress"
                    "finished": "Completed"
                stateListIsShowing: false
            }

        props: [ "columnname", "task", "users" ]

        ready: ->
            that = this

            field = this.$els.datepicker
            picker = new Pikaday( {
                onSelect: ( date ) ->
                    field.value = picker.getMoment().format "YYYY-MM-DD"
                    that.hasDeadline = true
                    that.deadline = picker.getMoment().format "YYYY-MM-DD"
            } )

            if( @task )
                this.taskName = @task.title
                this.deadline = @task.deadline
                picker.setDate @deadline
                for user in @task.users
                    @selectedUsers.push user.id
                this.hasDeadline = @task.deadline != ""
                this.hasDeleteButton = true
            else
                this.hasDeleteButton = false

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
                if @taskName == ''
                     @hasError = true
                     document.getElementById("newtask__name").focus()
                else @hasError = false
                oTask =
                    title: @taskName
                    deadline: @deadline
                    users: @selectedUsers
                    state: @state
                    position: 0
                    tag: @tag
                if @task
                    oTask.uuid = @task.uuid
                    oTask.position = @task.position
                    this.$dispatch "editTask", oTask
                else
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
