const Packet = require('../Packet');

class UserPacket extends Packet {
	constructor(game, user) {
		super(game, user.socket);

		this.user = user;
	}
}

module.exports = UserPacket;
