const UserPacket = require('./UserPacket');

class PacketGetMe extends UserPacket {
	doHandle(packetObject) {
		return {
			ok: true
			user: this.user.userData
		};
	}

	static get name() {
		return "getMe";
	}
}

module.exports = PacketGetMe;
