const express = require('express');
const fs = require('fs');
const http = require('http');
const labyrinth = require('./data/labyrinth.json');
const socketio = require('socket.io');
const packets = require('./src/packets');
const path = require('path');

const Game = require('./src/Game');

const game = new Game();
if(fs.existsSync('./savedata/savedata_load.json')) {
	game.loadGame('./savedata/savedata_load.json').then(() => {
		console.log("Successfully read save data!");
	});
}

const port = parseInt(process.env.PORT || '3000');
const app = express();
app.get('/labyrinth/:round', (req, res) => {
	const round = parseInt(req.params.round);
	const key = req.query.key;

	if(!isFinite(round) || typeof key !== 'string')
		return res.status(403).send("Plz Send In Correct Way :D");

	if(game.round < round)
		return res.status(403).send("Plz Wait :D");

	const labyrinthData = labyrinth.find(labyrinthData => labyrinthData.round === round);
	if(labyrinthData.key !== key)
		return res.status(403).send("Plz Send Correct Key :D");

	res.sendFile(labyrinthData.path, {root: path.resolve(__dirname, 'data', 'labyrinth')});
});

app.use('/', express.static('public'));
app.use('/dist', express.static('dist'));

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Listening on ${port}!`);
});

const io = socketio(server);
io.on('connection', socket => {
	packets(game, socket, packets.default);
});
