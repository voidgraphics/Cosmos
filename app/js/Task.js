var Task = {
    items: {},
    init: function(){
        var that = this;
        socket.emit( "task.getAll", function( oReturnedTasks ){
            that.items = oReturnedTasks;
            that.redraw();
        } );
    },
    redraw: function() {
        var aColumns = [].slice.call( document.querySelectorAll( ".task-items__cards" ) );
        aColumns.forEach( function( $column ){
            $column.innerHTML = "";
        } );

        var that = this;
        Object.keys( this.items ).forEach( function( key, oTask ){
            that.draw( key )
        } );

    },
    draw: function( iID ){
        // Getting the Column
        $addColumn = document.querySelector( "#" + this.items[iID].state );

        // Constructing the tile
        var taskItem = document.createElement( "div" );
        taskItem.dataset.id = iID;
        taskItem.className = "task-item";

        var taskItemName = document.createElement( "p" );
        taskItemName.className = "task-item__name";
        taskItemName.innerHTML = this.items[iID].title;

        var taskItemEditBtn = document.createElement( "a" );
        taskItemEditBtn.className = "task-item__edit";
        taskItemEditBtn.id = iID;
        taskItemEditBtn.href = "#";
        taskItemEditBtn.addEventListener( "click", Popup.toggle.bind( Popup ) );

        var taskItemDeleteBtn = document.createElement( "a" );
        taskItemDeleteBtn.className = "task-item__delete";
        taskItemDeleteBtn.dataset.id = iID;
        taskItemDeleteBtn.href = "#";
        taskItemDeleteBtn.addEventListener( "click", Popup.toggleDelete.bind( Popup ) );

        var taskItemDeadline = document.createElement( "date" );
        taskItemDeadline.className = "task-item__deadline";

        if( this.items[iID].deadline !== "" ){
            taskItemDeadline.innerHTML = moment( this.items[iID].deadline ).format( "ll" );
        } else {
            taskItemDeadline.innerHTML = "No deadline set";
        }


        if( this.items[iID].users.length !== 0 ) {
            var assignedTo = document.createElement( "div" );
            assignedTo.className = "task-item__assigned-to";

            this.items[iID].users.forEach( function( checkedUser ) {
                var assignedUser = document.createElement( "img" );
                assignedUser.className = "account__picture";
                assignedUser.src = "../img/" + checkedUser + ".png";
                assignedTo.appendChild( assignedUser );
            } );
            taskItem.appendChild( assignedTo );
        }

        taskItem.appendChild( taskItemName );
        taskItem.appendChild( taskItemEditBtn );
        taskItem.appendChild( taskItemDeleteBtn );
        taskItem.appendChild( taskItemDeadline );
        $addColumn.lastElementChild.appendChild( taskItem );

    },
    add: function( sTitle, sDeadline, aUsers, sState ){
        var taskID = Date.now();

        var taskObject = {
            title: sTitle,
            deadline: sDeadline,
            users: aUsers,
            state: sState
        };


        taskObject = taskObject;
        this.save( taskID, taskObject );
        this.draw( taskID );

    },
    get: function( iID ){
        return this.items[iID];
    },
    edit: function( iID ){
        var oEditedTaskItem = this.getFormData();

        this.update( iID, oEditedTaskItem );
        this.redraw();
        Popup.toggle();
    },
    getFormData: function() {
        var sTaskName, sDeadline, aCheckedUsers = [], sState;
        var $deadlineCheckbox = document.querySelector( "#new-task__hasDeadline" );
        var aUserCheckboxes = [].slice.call( document.querySelectorAll( ".assign-user__check" ) );

        sTaskName = document.querySelector( "#newtask__name" ).value;

        if( $deadlineCheckbox.checked ) {
            sDeadline = document.querySelector( "#datepicker" ).value;
        } else {
            sDeadline = "";
        }

        aUserCheckboxes.forEach( function( $checkbox ) {
            if( $checkbox.checked ){
                aCheckedUsers.push( $checkbox.id );
            }
        } );

        sState = document.querySelector( "input[name='new-task__state']:checked" ).value;

        return {
            title: sTaskName,
            deadline: sDeadline,
            users: aCheckedUsers,
            state: sState
        }
    },
    delete: function( iID ){
        console.log( "deleting task" );
        delete this.items[iID];
        socket.emit( "task.delete", iID );
        this.redraw();
        Popup.toggleDelete();
    },
    save: function( iID, oTask ){
        this.items[iID] = oTask;
        socket.emit( "task.save", oTask );
    },
    update: function( iID, oTask ){
        this.items[iID] = oTask;
        socket.emit( "task.update", iID, oTask );
    }
};
