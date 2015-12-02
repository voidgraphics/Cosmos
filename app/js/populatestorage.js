( function(){

    "use strict";

    var obj0 = {
        title: "Something to do",
        deadline: "2016-01-16",
        users: [ "user1", "user2" ],
        state: "todo"
    };
    obj0 = JSON.stringify( obj0 );
    localStorage.setItem( "0", obj0 );

    var obj1 = {
        title: "Something else to do",
        deadline: "2016-01-15",
        users: [ "user2", "user4" ],
        state: "todo"
    };
    obj1 = JSON.stringify( obj1 );
    localStorage.setItem( "1", obj1 );

    var obj2 = {
        title: "Something in progress",
        deadline: "2015-12-26",
        users: [ "user3" ],
        state: "inprogress"
    };
    obj2 = JSON.stringify( obj2 );
    localStorage.setItem( "2", obj2 );

    var obj3 = {
        title: "Something finished",
        deadline: "2016-03-07",
        users: [ "user1" ],
        state: "finished"
    };
    obj3 = JSON.stringify( obj3 );
    localStorage.setItem( "3", obj3 );

    var obj4 = {
        title: "Something else finished",
        deadline: "2016-01-03",
        users: [ "user4" ],
        state: "finished"
    };
    obj4 = JSON.stringify( obj4 );
    localStorage.setItem( "4", obj4 );


} )();
