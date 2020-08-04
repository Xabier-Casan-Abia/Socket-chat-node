const { Users } = require('../classes/users');
const users = new Users();
const { io } = require('../server');
const { createMessage } = require('../utilities/utilities');



io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'Name and Room are required'
            });
        }
        client.join(data.room);
        users.addUser(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('usersList', users.getUsersperRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.name} entered the chat`));
        callback(users.getUsersperRoom(data.room));

    })

    client.on('createMessage', (data, callback) => {
        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('createMessage', message);
        callback(message);
    });

    client.on('disconnect', () => {


        let deletedUser = users.deleteUser(client.id);
        client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Admin', `${deletedUser.name} left the chat`));
        client.broadcast.to(deletedUser.room).emit('usersList', users.getUsersperRoom(deletedUser.room));
    })

    // Private messages
    client.on('privateMessage', (data) => {

        if (!data.message) {
            return {
                error: true,
                message: 'Message is required'
            };
        }

        let user = users.getUser(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
    })

});