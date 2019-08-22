const Packet = require('../Packet');

class AdminPacket extends Packet {
	constructor(game, admin) {
		super(game, admin.socket);
	}
}

module.exports = AdminPacket;
