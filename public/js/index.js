    var socket=io();

    socket.on('connect', function () {
        console.log('connected to server');

        
    });

    socket.on('disconnect', function () {
        console.log('diconnected from server');
    });

    socket.on('newMessage', function (message) {
        console.log('new email', message);
    });