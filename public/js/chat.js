    var socket=io();

    function scrollToBottom(){
        //selectors
        var messages=jQuery('#messages');
        var newMessage=messages.children('li:last-child');
        //heights
        var clientHeight=messages.prop('clientHeight');
        var scrollTop=messages.prop('scrollTop');
        var scrollHeight=messages.prop('scrollHeight');
        var newMessageHeight=newMessage.innerHeight();
        var lastMessageHeight=newMessage.prev().innerHeight();

        if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
            messages.scrollTop(scrollHeight);
        }
    }

    socket.on('connect', function () {
        console.log('connected to server');

        
    });

    socket.on('disconnect', function () {
        console.log('diconnected from server');
    });

    socket.on('newMessage', function (message) {
        var formatedTime=moment(message.createdAt).format('h:mm a');
       
        var template=jQuery('#message-template').html();
        var html=Mustache.render(template, {
            text:message.text,
            from: message.from,
            createdAt:formatedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
        //console.log('new email', message);
          //  var li=jQuery('<li></li>');
        //  li.text(`${message.from} ${formatedTime}: ${message.text}`);

        //  jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message){
        var formatedTime=moment(message.createdAt).format('h:mm a');

        var template=jQuery('#location-message-template').html();
        var html=Mustache.render(template, {
            url:message.url,
            from: message.from,
            createdAt:formatedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();

        // var li=jQuery('<li></li>');
        // var a=jQuery('<a target="_blank">My current location</a>');
        //  li.text(`${message.from} ${formatedTime}: `);
        //  a.attr('href',message.url);
        //  li.append(a);
        //  jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();
        var messageTextbox=jQuery('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function(){
            messageTextbox.val('');
        });
    });

    var lacationButton=jQuery('#send-location');

    lacationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocation is not supported by your browser.');
        }

        lacationButton.attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition(function(position){
            lacationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude:position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function(){
            alert('Unable to fetch location');
            locationButton.removeAttr('disabled').text('Send location');
        });
    });