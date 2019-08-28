const config = require('../config.json');
const buildings = require('../data/buildings.json');
const events = require('../data/events.json');
const fs = require('fs');
const labyrinth = require('../data/labyrinth.json');
const path = require('path');

const Building = require('./Building');
const Event = require('./Event');
const User = require('./User');
const UserAdmin = require('./UserAdmin');

class Game {
	constructor() {
		this.state = 'not-started';

		this.config = config;
		this.buildings = {};
		this.users = {};
		this.events = [];
		this.admins = [];
		this.round = 0;
		this.enabledLabyrinth = null;

		this.journals = [];
		this.nextRoundTick = this.config['round-minutes'] * 60 * 4;

		this.tick = 0;
		this.updateBound = this.update.bind(this);

		this.initData();
	}

	initData() {
		this.events.push(...events.map(event => new Event(this, event)));
		buildings.forEach(building => {
			this.buildings[building.uid] = new Building(this, building);
		});
	}

	start() {
		this.state = 'playing';
		this.nextRound();
		this.update();
	}

	pause() {
		this.state = 'paused';
	}

	resume() {
		this.state = 'playing';
	}

	update() {
		if(this.state === 'playing') {
			this.tick++;
			this.nextRoundTick--;
		}

		this.broadcastPacket(
			'game.tick',
			{
				tick: this.tick,
				roundLeft: this.nextRoundTick,
				gameState: this.state
			}
		);

		if(this.nextRoundTick <= 0) {
			this.nextRound();
		}

		setTimeout(this.updateBound, 250);
	}

	addUser(name) {
		const user = new User(this, name);
		if(this.users[user.uid])
			throw new Error("User already exists!");

		this.users[user.uid] = user;

		this.addJournal('game.newuser', {
			name,
			uid: user.uid,
			token: user.token
		});

		this.broadcastPacket('user.updateAsAdmin', {
			user: user.userDataSpecific
		});

		return user;
	}

	addAdmin() {
		const admin = new UserAdmin(this);
		this.admins.push(admin);

		return admin;
	}

	removeAdmin(uid) {
		const adminIndex = this.admins.findIndex(admin => admin.uid === uid);
		if(adminIndex > 0) {
			this.admins.splice(adminIndex, 1);
		}
	}

	nextRound() {
		const appliedEvents = this.events.filter(event => event.round === this.round);

		if(this.round !== 0)
			this.buildingsList.forEach(building => building.lastPrice = building.price);

		appliedEvents.forEach(event => event.execute());

		this.addJournal('game.nextround', {
			round: this.round
		});

		this.round++;
		this.nextRoundTick = this.config['round-minutes'] * 60 * 4;

		const newLabyrinth = labyrinth.find(labyrinthData => labyrinthData.round === this.round);
		if(newLabyrinth) {
			this.enabledLabyrinth = newLabyrinth;
		}

		let labyrinthPacket = null;

		if(newLabyrinth) {
			labyrinthPacket = {
				key: this.enabledLabyrinth.key,
				round: this.enabledLabyrinth.round
			};
		}

		this.broadcastPacket(
			'game.nextround',
			user => ({
				round: this.round,
				appliedEvents: appliedEvents.map(event => event.eventData),
				buildingStatus: this.buildingsList.map(building => building.buildingData),
				userData: user.userData,
				labyrinth: labyrinthPacket
			})
		);
		
		this.saveGame(true);

		if(this.round > this.config['max-round']) {
			this.finish();
		}
	}

	addJournal(logName, payload) {
		console.log(logName, payload);

		const journalObject = {
			name: logName,
			payload
		};

		if(this.config['journal-state']) {
			journalObject.state = {
				users: this.usersList.map(v => v.userData),
				buildings: this.buildingsList.map(v => v.buildingDataMinimal)
			};
		}

		this.journals.push(journalObject);
		this.broadcastPacket('game.journal', journalObject, 'admin');

		this.saveGame();
	}

	async saveGame(isNextRound = false) {
		if(!this.config['save-enabled']) return;
		let savedest = './savedata';

		try {
			await fs.promises.access('./savedata');
		} catch(e) {
			try {
				await fs.promises.mkdir('./savedata');
			} catch(e2) {
				savedest = './';
			}
		}

		const date = new Date();
		const saveLocation = path.join(savedest,
			(this.config['save-only-one'] & !isNextRound) ?
				'savedata.json' :
				`save R${this.round},${this.tick}-${
				date.getFullYear()}. ${
				date.getMonth() + 1}. ${
				date.getDate()}. ${
				date.getHours()}-${
				date.getMinutes()}-${
				date.getSeconds()}.json`
		);

		const saveObject = {
			journals: this.journals,
			users: this.usersList.map(user => user.userDataSpecific),
			buildings: this.buildingsList
				.map(building => building.buildingDataMinimal),
			round: this.round,
			tick: this.tick,
			nextRoundTick: this.nextRoundTick,
			state: this.state,
			timestamp: date.getTime()
		};

		await fs.promises.writeFile(saveLocation, JSON.stringify(saveObject, null, '\t'));
	}

	async loadGame(savePath) {
		const saveObject = JSON.parse(
			await fs.promises.readFile(savePath, 'utf8')
		);

		this.journals = saveObject.journals;
		this.tick = saveObject.tick;
		this.nextRoundTick = saveObject.nextRoundTick;
		this.round = saveObject.round;
		this.state = saveObject.state;
		this.enabledLabyrinth = labyrinth.reduce((prev, curr) => {
			if(curr.round > this.round) return prev;
			if(prev !== null && prev.round > curr.round) return prev;
			return curr;
		}, null);

		saveObject.users.forEach(userData => {
			const user = new User(this, userData.name);
			user.token = userData.token;
			user.uid = userData.uid;
			user.money = userData.money;
			user.buildings = userData.buildings;

			this.users[user.uid] = user;
		});

		saveObject.buildings.forEach(buildingData => {
			this.buildings[buildingData.uid].price = buildingData.price;
			this.buildings[buildingData.uid].lastPrice = buildingData.lastPrice;
			this.buildings[buildingData.uid].owner = buildingData.owner;
		});
	}

	broadcastPacket(packetName, payloadFnOrPayload, notifyFor = 'all') {
		let notifyList = null;
		switch(notifyFor) {
			case 'admin':
				notifyList = this.admins;
				break;

			case 'user':
				notifyList = this.users;
				break;

			case 'all':
				notifyList = this.socketsList;
				break;

			default:
				throw new Error("Wrong notify list!");
		}

		notifyList.forEach(user => {
			const payload = typeof payloadFnOrPayload === 'function' ?
				payloadFnOrPayload(user) :
				payloadFnOrPayload;

			if(user.socket) {
				try {
					user.socket.emit(packetName, payload);
				} catch(e) {}
			}
		});
	}

	finish() {
		this.state = 'finished';
	}

	get buildingsList() {
		return Object.values(this.buildings);
	}

	get usersList() {
		return Object.values(this.users);
	}

	get socketsList() {
		return this.usersList.concat(this.admins);
	}
}

module.exports = Game;
