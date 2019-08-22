const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const packets = require('./src/packets');

const Game = require('./src/Game');

const port = parseInt(process.env.PORT || '3000');
const app = express();

const game = new Game();

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Listening on ${port}!`);
});

const io = socketio(server);
io.on('connection', socket => {
	//FIXME remove this before production
	console.log("New Connection Established!");
	packets(game, socket, packets.default);
});
