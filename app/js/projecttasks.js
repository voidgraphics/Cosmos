( function(){

    "use strict";

    Popup.init();
    Task.init();
    console.log( "Hello" );

    var aAddTaskBtns,
        aTaskItems = [],
        $addTaskForm,
        $closePopupBtn,
        $overlay,
        $deadlineCheckbox,
        $addColumn,
        aUserCheckboxes,
        i;

    aAddTaskBtns        = [].slice.call( document.querySelectorAll( ".add-task-btn" ) );
    aUserCheckboxes     = [].slice.call( document.querySelectorAll( ".assign-user__check" ) );
    $addTaskForm        = document.querySelector( "#task-form" );
    $closePopupBtn      = document.querySelector( ".close-popup" );
    $overlay            = document.querySelector( ".popup-overlay" );
    $deadlineCheckbox   = document.querySelector( "#new-task__hasDeadline" );


    var fAddTask = function( e ){
        e.preventDefault();

        var sTaskName, sDeadline, aCheckedUsers = [], sState;

        sTaskName = document.querySelector( "#newtask__name" ).value;

        if( $deadlineCheckbox.checked ) {
            sDeadline = document.querySelector( "#datepicker" ).value;
        } else {
            sDeadline = "No deadline defined.";
        }

        aUserCheckboxes.forEach( function( $checkbox ) {
            if( $checkbox.checked ){
                aCheckedUsers.push( $checkbox.id );
            }
        } );

        sState = document.querySelector( "input[name='new-task__state']:checked" ).value;

        Task.add( sTaskName, sDeadline, aCheckedUsers, sState );

        Popup.toggle();
        $addTaskForm.reset();

    };


    // Event listeners
    aAddTaskBtns.forEach( function( $addBtn ){
        $addBtn.addEventListener( "click", Popup.toggle.bind( Popup ) );
    } );

    $closePopupBtn.addEventListener( "click", Popup.toggle.bind( Popup ) );
    $overlay.addEventListener( "click", Popup.toggle.bind( Popup ) );
    $addTaskForm.addEventListener( "submit", function( e ){
        e.preventDefault();
        if( document.querySelector( ".popup #taskID" ).value === "" ){
            fAddTask( e );
        } else {
            var iID = document.querySelector( ".popup #taskID" ).value;
            Task.edit( iID );
            console.log("We're editing");
        }
    } );
    document.querySelector( "#confirmDelete" ).addEventListener( "click", function( e ){
        targetID = e.target.dataset.id;
        Task.delete( targetID );
    } );





    // Init dragula for drag n drop
    var drake = dragula([document.querySelector('#todo-column__items'), document.querySelector('#progress-column__items'), document.querySelector('#finished-column__items')]);

    drake.on( "dragend", function( element ) {
        var sNewState = element.parentNode.parentNode.id;
        var taskItem = Task.get( element.dataset.id );
        taskItem.state = sNewState;
        Task.update( element.dataset.id, taskItem );
        Task.redraw();
    } );

} )();
