var Task = {
    items: {},
    init: function(){
        for( i = 0; i < localStorage.length; i++ ) {
            this.items[localStorage.key(i)] = JSON.parse( localStorage.getItem( localStorage.key(i) ) );
            this.draw(localStorage.key(i));
        }
    },
    redraw: function() {
        var aColumns = [].slice.call( document.querySelectorAll( ".task-items__cards" ) );
        aColumns.forEach( function( $column ){
            $column.innerHTML = "";
        } );
        for( i = 0; i < localStorage.length; i++ ) {
            this.items[localStorage.key(i)] = JSON.parse( localStorage.getItem( localStorage.key(i) ) );
            this.draw(localStorage.key(i));
        }
    },
    draw: function( iID ){

        // Getting the Column
        $addColumn = document.querySelector( "#" + this.items[iID].state );

        // Constructing the tile
        var taskItem = document.createElement( "div" );
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
        var taskID = localStorage.length++;

        var taskObject = {
            title: sTitle,
            deadline: sDeadline,
            users: aUsers,
            state: sState
        };

        this.items[taskID] = taskObject;
        taskObject = JSON.stringify( taskObject );
        localStorage.setItem( taskID, taskObject );
        this.draw( taskID );

    },
    get: function( iID ){
        return this.items[iID];
    },
    edit: function( iID ){
        var editedTaskItem = this.getFormData();

        this.items[iID] = editedTaskItem;
        localStorage.setItem( iID, JSON.stringify( editedTaskItem ) );
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
                console.log( $checkbox );
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
        alert( "Deleting " + iID );
    },
};
