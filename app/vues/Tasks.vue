<template src="../html/projecttasks.html"></template>

<script lang="coffee">
    zouti = require "zouti"
    Dragula = require "dragula"
    Moment = require "moment"
    orderBy = require 'lodash.orderby'

    Tasks =
        items: []
        data: ->
            return {
                popupIsShowing: false
                deletePopupIsShowing: false
                taskToDelete: null
                columnName: null
                tasks: [ { title: "not loaded yet" } ]
                users: []
                showSortMenu: false
                sort:
                    "mine": false
                    "0": true
                    "1": true
                    "2": true
                    "3": true
                    "4": true
                    "5": true
                    "6": true
                categories: [
                    false,
                    "Design",
                    "Front-end",
                    "Back-end",
                    "Planning",
                    "Testing",
                    "Bugs"
                ]
                sortButtonText: "Hide all"

                isColorblind: false
             }

        asyncData: ( resolve, reject ) ->
            sProjectId = localStorage.selectedProject
            socket.emit "task.getAll", sProjectId, ( oReturnedTasks ) ->
                items = Object.keys( oReturnedTasks ).map( ( key ) -> return oReturnedTasks[ key ] )
                console.log items
                resolve { tasks: items }

        ready: ->
            drake = Dragula( [ document.querySelector( '#todo-column__items' ), document.querySelector( '#progress-column__items' ), document.querySelector( '#finished-column__items' ) ] )

            if localStorage.settings
                settings = JSON.parse localStorage.settings
                @isColorblind = settings.usability.isColorblind

            socket.on "task.updated", ( oTask ) =>
                console.log oTask
                @replaceTask oTask

            socket.on "task.created", ( oTask ) =>
                this.tasks.push oTask

            socket.on "task.removed", ( sTaskId ) =>
                for task in @tasks
                    if task.uuid == sTaskId
                        this.tasks.$remove( task )
                        return

            drake.on "drag", ( element ) =>
                # Decrease position of all tasks after the one we're dragging
                iOldPosition = [].indexOf.call element.parentNode.children, element
                index = parseInt element.dataset.id
                column = element.parentNode.parentNode.id

                currentColumnTasks = this.tasks.filter ( task ) ->
                    return ( task.state == column ) && ( task.position >= iOldPosition ) && ( task.uuid != index )

                for task in currentColumnTasks
                    --task.position

            drake.on "dragend", ( element ) =>
                # Handle new position
                sNewState = element.parentNode.parentNode.id
                index = element.dataset.id
                iNewPosition = [].indexOf.call element.parentNode.children, element

                for task in this.tasks
                    if task.uuid == index
                        task.state = sNewState
                        task.position = iNewPosition
                        socket.emit "task.notifyMove", task
                        break

                column = element.parentNode.parentNode.id

                currentColumnTasks = this.tasks.filter ( task ) ->
                    return ( task.state == column ) && ( task.position >= iNewPosition ) && ( task.uuid != index )

                for task in currentColumnTasks
                    task.position++

                # Send modified tasks to server
                socket.emit "task.saveAll", @tasks

            drake.on 'over', ( el, container, source ) =>
                container.classList.add( 'task-items__cards--over' )

            drake.on 'out', ( el, container, source ) =>
                container.classList.remove( 'task-items__cards--over' )

            socket.emit "team.getUsers", localStorage.selectedTeam

            socket.on "team.receiveUser", ( oUser ) =>
                oUser.src = "data:image/png;base64,#{oUser.avatar}"
                oUser.isTooltipVisible = false
                @users.push oUser

        methods:
            showPopup: ( sColumn )  ->
                this.columnName = sColumn
                this.popupIsShowing = true

            showEditPopup: ( oTask, sColumn ) ->
                this.taskToEdit = oTask
                this.columnName = sColumn
                this.popupIsShowing = true

            showDeletePopup: ( task ) ->
                this.taskToDelete = task
                this.deletePopupIsShowing = true

            delete: ->
                # Deleting client-side
                this.tasks.$remove( this.taskToDelete )

                # Deleting server-side
                socket.emit "task.delete", this.taskToDelete.uuid, localStorage.selectedProject

                this.deletePopupIsShowing = false

            findUserSrc: ( oUser ) ->
                for user in @users
                    id = if typeof oUser is "string" then oUser else oUser.uuid || oUser.id
                    if id == user.uuid
                        return user.src

            findUser: ( sUserId ) ->
                for user in @users
                    if user.uuid == sUserId
                        return user

            sorted: ( oTask ) ->
                if @sort['mine']
                    for user in oTask.users
                        condOne = ( user.id || user.uuid ) == localStorage.userId
                        if condOne then break
                condTwo = @sort[oTask.tag]
                if(@sort['mine']) then return condOne && condTwo
                else return condTwo

            hasSortRules: ->
                return @sort['0'] || @sort['1'] || @sort['2'] || @sort['3'] || @sort['4'] || @sort['5'] || @sort['6']

            toggleSortRules: ->
                if @hasSortRules()
                    return @uncheckSortCheckboxes()
                @checkSortCheckboxes()

            checkSortCheckboxes: ->
                @sort['0'] = @sort['1'] = @sort['2'] = @sort['3'] = @sort['4'] = @sort['5'] = @sort['6'] = true
                @updateSortButton()

            uncheckSortCheckboxes: ->
                @sort['0'] = @sort['1'] = @sort['2'] = @sort['3'] = @sort['4'] = @sort['5'] = @sort['6'] = false
                @updateSortButton()

            updateSortButton: ->
                if @hasSortRules()
                    @sortButtonText = "Hide all"
                else
                    @sortButtonText = "Show all"

            replaceTask: ( oTask ) ->
                for task, key in @tasks
                    if task.uuid == oTask.uuid
                        @tasks.$remove @tasks[key]
                        break
                @tasks.push oTask

        computed:
            todoTasks: () ->
                tasks = @tasks.filter ( task ) =>
                    if task.state then return task.state.indexOf('todo') != -1
                return orderBy tasks, 'position'

            inProgressTasks: () ->
                tasks = @tasks.filter ( task ) =>
                    if task.state then return task.state.indexOf('inprogress') != -1
                return orderBy tasks, 'position'

            completedTasks: () ->
                tasks = @tasks.filter ( task ) =>
                    if task.state then return task.state.indexOf('finished') != -1
                return orderBy tasks, 'position'

        filters:
            formatted: ( value ) ->
                return Moment(value).fromNow();

        events:
            hidePopup: ->
                this.taskToEdit = null
                this.popupIsShowing = false

            hideDeletePopup: ->
                this.deletePopupIsShowing = false

            showDelete: ( task ) ->
                this.showDeletePopup( task )

            confirmDelete: ->
                this.delete()

            editTask: ( oTask ) ->
                if oTask.title == "" then return
                for task in @tasks
                    if task.uuid == oTask.uuid
                        task.title = oTask.title
                        task.deadline = oTask.deadline
                        task.tag = oTask.tag
                        task.users = []
                        for user in oTask.users
                            user = @findUser user
                            task.users.push user
                        task.state = oTask.state
                        task.position = oTask.position
                        break

                socket.emit "task.update", oTask
                this.taskToEdit = null
                this.popupIsShowing = false

            submitTask: ( oTask ) ->
                if oTask.title == "" then return
                oTask.uuid = zouti.uuid()
                oTask.projectId = localStorage.selectedProject
                socket.emit "task.save", oTask
                if oTask.deadline == '' then oTask.deadline = '0000-00-00'
                # this.tasks.push( oTask )
                for task in this.tasks
                    if task.state == oTask.state && task.uuid != oTask.uuid
                        task.position++

                socket.emit "task.saveAll", @tasks

                this.popupIsShowing = false

            changeProject: ( oTeam, oProject ) ->
                @users = []
                socket.emit "team.getUsers", oTeam.uuid
                socket.emit "task.getAll", oProject.uuid, ( aTasks ) =>
                    @tasks = aTasks

            toggleColorblind: ( bIsColorblind ) ->
                @isColorblind = bIsColorblind

    module.exports = Tasks

</script>
