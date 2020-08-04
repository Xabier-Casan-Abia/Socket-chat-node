let socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and Room are required');
}

if (params.get('name') === 'Admin' || params.get('name') === 'admin' || params.get('name') === 'administrator' || params.get('name') === 'Administrator') {
    window.location = 'index.html';
    throw new Error('Please choose a different name');
}

const user = {
    name: params.get('name'),
    room: params.get('room')
};

// Listen
socket.on('connect', () => {

    console.log('Connected to server');

    socket.emit('enterChat', user, (resp) => {
        renderUsers(resp);
        renderRoom(resp.room);
    });

});

socket.on('disconnect', () => {
    console.log('Lost conexion with server');
});

// Listen to information
socket.on('createMessage', (message) => {
    renderMessage(message, false);
    scrollBottom();
});

// Listen to users entering or leaving the chat
socket.on('usersList', (users) => {
    renderUsers(users);

});

// Listen to private messages
socket.on('privateMessage', (message) => {
    console.log('Private mesasge:', message);
});