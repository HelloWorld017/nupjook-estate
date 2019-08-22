const packets = require('./packets');
const User = require('./User');

class UserAdmin extends User {
	constructor(game, name) {
		super(game, "Admin");

		this.uid = Math.random().toString(36).slice(2, 7).toUpperCase();
		this.token = game.config['admin-token'];
		this.money = 0;
		this.buildings = [];
	}

	connectSocket(socket) {
		this.socket = socket;
		this.socket.on('disconnect', () => {
			this.game.removeAdmin(this.uid);
		});

		packets(this.game, socket, packets.user, this);
		packets(this.game, socket, packets.admin, this);
	}

	buyBuilding() {
		throw new Error("Admin can't buy any buildings!");
	}

	sellBuilding() {
		throw new Error("Admin can't sell any buildings!");
	}

	get userData() {
		return {
			isAdmin: true,
			uid: this.uid,
			money: this.money,
			buildings: this.buildings
		};
	}
}

module.exports = User;
