const config = require('../config.json');
const buildings = require('../data/buildings.json');
const events = require('../data/events.json');

const Building = require('./Building');
const Event = require('./Event');
const User = require('./User');

class Game {
	constructor() {
		this.config = config;
		this.buildings = {};
		this.users = {};
		this.events = [];
		this.admins = [];
		this.round = 0;

		this.journals = [];
		this.nextRoundTick = this.config['round-minutes'] * 60 * 20;

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
		this.update();
	}

	update() {
		this.tick++;
		this.nextRoundTick--;

		this.broadcastPacket(
			'game.tick',
			{
				tick: this.tick,
				roundLeft: this.nextRoundTick
			}
		);

		if(this.nextRoundTick <= 0) {
			this.nextRound();
		}

		setTimeout(this.updateBound, 50);
	}

	addUser(name) {
		const user = new User(this, name);
		if(this.users[user.uid])
			throw new Error("User already exists!");

		this.users[user.uid] = user;

		this.addJournal('game.newuser', {
			name,
			uid: user.uid
		});

		return user.token;
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

		this.buildingsList.forEach(building => building.nextPrice = building.price);
		appliedEvents.forEach(event => event.execute());
		this.buildingsList.forEach(building => building.price = building.nextPrice);

		this.addJournal('game.nextround', {
			round: this.round
		});

		this.round++;
		this.broadcastPacket(
			'game.nextround',
			user => ({
				round: this.round,
				appliedEvents: appliedEvents.map(event => event.eventData),
				buildingStatus: this.buildingsList.map(building => building.buildingData),
				userData: user.userData
			})
		);

		if(this.round > this.config) {
			this.finish();
		}
	}

	addJournal(logName, payload) {
		const journalObject = {
			name: logName,
			payload,
			state: {
				users: this.usersList.map(v => v.userData),
				buildings: this.buildingsList.map(v => v.buildingData)
			}
		};

		this.journals.push(journalObject);
		this.broadcastPacket('game.journal', journalObject, 'admin');
	}

	async saveGame() {
		let savedest = './savedata';

		try {
			await fs.access('./savedata');
		} catch(e) {
			try {
				await fs.promises.mkdir('./savedata');
			} catch(e2) {
				savedest = './';
			}
		}

		const date = new Date();
		const saveLocation = path.join(savedest, `save-${
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
			buildings: this.buildingsList.map(building => building.buildingData),
			round: this.round,
			tick: this.tick,
			nextRoundTick: this.nextRoundTick
		};

		await fs.promises.writeFile(saveLocation, JSON.stringify(saveObject, null, '\t'));
	}

	async loadGame(savePath) {
		const saveObject = JSON.parse(
			await fs.promises.readFile(savePath, 'utf-8')
		);

		this.journals = saveObject.journals;
		this.tick = saveObject.tick;
		this.nextRoundTick = saveObject.nextRoundTick;
		this.round = saveObject.round;

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
