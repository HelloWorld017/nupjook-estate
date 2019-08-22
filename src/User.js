const packets = require('./packets');

class User {
	constructor(game, name) {
		this.game = game;
		this.name = name;
		this.uid = this.name.replace(/[^A-Za-z0-9]/g, '');
		this.token = Math.random().toString(36).slice(2, 7).toUpperCase();
		this.socket = null;

		this.money = this.game.config['initial-money'];
		this.buildings = [];
	}

	connectSocket(socket) {
		this.game.addJournal(
			'user.connect',
			{
				userUid: this.uid
			}
		);

		this.socket = socket;
		this.socket.on('disconnect', () => {
			this.game.addJournal(
				'user.disconnect',
				{
					userUid: this.uid
				}
			);

			this.socket = null;
		});

		packets(this.game, socket, packets.user, this);
	}

	buyBuilding(buildingUid) {
		if(!this.game.buildings[buildingUid])
			throw new Error("No such building!");

		if(this.game.buildings[buildingUid].owner !== null)
			throw new Error("The building was already bought!");

		if(this.game.buildings[buildingUid].price > this.money)
			throw new Error("The building is too expensive!");

		if(this.buildings.includes(buildingUid))
			throw new Error("Already bought!");

		this.game.buildings[buildingUid].owner = this.uid;
		this.money -= this.game.buildings[buildingUid].price;
		this.buildings.push(buildingUid);

		const buildingData = this.game.buildings[buildingUid].buildingData;
		this.game.addJournal(
			'user.buy',
			{
				userData: this.userData,
				building: buildingData
			}
		);

		this.game.broadcastPacket('building.update', {building: buildingData});
		this.socket.emit('user.update', {
			user: this.userData
		});
	}

	sellBuilding(buildingUid) {
		const index = this.buildings.indexOf(buildingUid);

		if(index < 0)
			throw new Error("You don't have such building!");

		this.game.buildings[buildingUid].owner = null;
		this.money += this.game.buildings[buildingUid].price;
		this.buildings.splice(index, 1);

		const buildingData = this.game.buildings[buildingUid].buildingData;
		this.game.addJournal(
			'user.sell',
			{
				userData: this.userData,
				building: buildingData
			}
		);

		this.game.broadcastPacket('building.update', {building: buildingData});
		this.socket.emit('user.update', {
			user: this.userData
		});
	}

	get userData() {
		return {
			name: this.name,
			uid: this.uid,
			money: this.money,
			buildings: this.buildings
		};
	}

	get userDataSpecific() {
		return Object.assign(
			{token: this.token},
			this.userData
		);
	}
}

module.exports = User;
