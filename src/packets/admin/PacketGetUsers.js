const AdminPacket = require('./AdminPacket');

class PacketGetUsers extends AdminPacket {
	doHandle() {
		return {
			ok: true,
			users: this.game.usersList.map(user => user.userDataSpecific)
		};
	}

	static get name() {
		return "getUsers";
	}
}

module.exports = PacketGetUsers;
