"use strict";

localStorage.removeItem( "debug" );

var socket = io( "http://localhost:12345" );

socket.on( "connect", function () {

} );
