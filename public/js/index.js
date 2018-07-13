    var socket=io();

    socket.on('connect', function () {
        console.log('connected to server');

        socket.emit('createMessage', {
            from:'aas@ww.co',
            text:'Hello'
        })
    });

    socket.on('disconnect', function () {
        console.log('diconnected from server');
    });

    socket.on('newMessage', function (message) {
        console.log('new email', message);
    });