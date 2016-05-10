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
            }

        props: [ "columnname" ]

        ready: ->
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

                # console.log "Submitting task :", oTask
                this.$dispatch "submitTask", oTask

        filters:
            dateFromNow: ( value ) ->
                Moment( value ).fromNow()

            dateForHumans: ( value ) ->
                Moment().format( 'll' )
</script>
