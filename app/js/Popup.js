var Popup = {
    title: document.querySelector( ".popup .popup-title" ),
    popupElement: document.querySelector( ".popup" ),
    deletePopupElement: document.querySelector( ".deletePopup" ),
    picker: null,
    init: function(){
        var $deadlineCheckbox = document.querySelector( "#new-task__hasDeadline" );
        // Init date picker
        var field = document.getElementById( "datepicker" );
        var picker = new Pikaday( {
            minDate: new Date(),
            onSelect: function( date ) {
                field.value = picker.getMoment().format( "YYYY-MM-DD" );
                $deadlineCheckbox.checked = true;
                document.getElementById( "currentDate" ).innerHTML = "Deadline " + picker.getMoment().fromNow();
            }
        });
        this.picker = picker;
        field.parentNode.insertBefore( this.picker.el, field.nextSibling );
    },
    toggle: function( e ){
        if( e ){
            e.preventDefault();

            document.getElementById( "currentDate" ).innerHTML = "Today is " + moment().format("ll");

            if( e.target.classList.contains( "task-item__edit" ) ){
                var taskID = e.target.id;
                this.useEditForm( taskID );
            } else {
                this.useAddForm();
            }
        }

        if( this.deletePopupElement.classList.contains( "hidden" ) ){
            this.popupElement.classList.toggle( "hidden" );
        }
        if( !this.popupElement.classList.contains( "hidden" ) ) {
            $addColumn = e.target.parentNode;
        }
    },
    toggleDelete: function( e ){
        if( e ) {
            e.preventDefault();
            targetID = e.target.dataset.id;
            document.querySelector( "#confirmDelete" ).dataset.id = targetID;
        }
        this.deletePopupElement.classList.toggle( "hidden" );
    },
    useEditForm: function( taskID ){
        var aUserCheckboxes = [].slice.call( document.querySelectorAll( ".assign-user__check" ) );
        aUserCheckboxes.forEach( function( userCheckbox ){
            userCheckbox.checked = "";
        } );

        var taskToEdit = Task.get( taskID );

        this.title.innerHTML = "Editing: " + taskToEdit.title;
        document.querySelector( ".popup #taskID" ).value = taskID;
        document.querySelector( "#newtask__name" ).value = taskToEdit.title;

        if( taskToEdit.deadline !== "" ) {
            document.getElementById( "currentDate" ).innerHTML = "Deadline " + moment(taskToEdit.deadline).fromNow();
        }

        document.querySelector( ".task-submit" ).value = "Edit this task";
        this.picker.setDate( taskToEdit.deadline );
        taskToEdit.users.forEach( function( user ){
            document.getElementById( user ).checked = "checked";
        } );
        document.getElementById( "state-" + taskToEdit.state ).checked = "checked";
    },
    useAddForm: function(args){
        this.title.innerHTML = "Add task";
        document.querySelector( "#newtask__name" ).value = "";
        document.querySelector( ".task-submit" ).value = "Add this task";
        this.picker.gotoToday();
        if( this.picker.getDate() ){
            this.picker.setDate(new Date());
        }
        document.querySelector( "#task-form" ).reset();
    },
};
