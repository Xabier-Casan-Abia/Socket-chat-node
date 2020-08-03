const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

let server = http.createServer(app);

// Backend communication
module.exports.io = socketIO(server);
require("./sockets/socket");

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running from port ${ port }`);

});