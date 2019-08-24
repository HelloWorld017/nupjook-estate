const AdminPacket = require('./AdminPacket');

class PacketAddUser extends AdminPacket {
	doHandle({name}) {
		try {
			const {uid, token} = this.game.addUser(name);

			return {
				ok: true,
				uid,
				token
			};
		} catch(e) {
			return {
				ok: false,
				reason: e.message
			};
		}
	}

	static get name() {
		return "addUser";
	}
}

module.exports = PacketAddUser;
