"use strict";

localStorage.removeItem( "debug" );

var socket = io( "http://www.intothevoid.space:12346" );

socket.on( "connect", function () {
     console.log( "Socket successfully connected." );
 } );
