let socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and Room are required');
}

const user = {
    name: params.get('name'),
    room: params.get('room')
};

// Listen
socket.on('connect', () => {

    console.log('Connected to server');

    socket.emit('enterChat', user, (resp) => {
        console.log('Users: ', resp);
    });

});

socket.on('disconnect', () => {
    console.log('Lost conexion with server');
});

// Listen to information
socket.on('createMessage', (message) => {
    console.log('Server:', message);
});

// Listen to users entering or leaving the chat
socket.on('usersList', (users) => {
    console.log('Server:', users);
});

// Listen to private messages
socket.on('privateMessage', (message) => {
    console.log('Private mesasge:', message);
});