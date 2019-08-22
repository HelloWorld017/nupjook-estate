const AdminPacket = require('./AdminPacket');

class PacketAddUser extends AdminPacket {
	doHandle({name}) {
		try {
			this.game.addUser(name);
		} catch(e) {
			return {
				ok: false,
				reason: e.message
			};
		}

		return {
			ok: true
		};
	}

	static get name() {
		return "addUser";
	}
}

module.exports = PacketAddUser;
