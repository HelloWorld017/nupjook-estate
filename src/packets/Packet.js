class Packet {
	constructor(game, socket) {
		this.game = game;
		this.name = this.constructor.name;
		this.socket = socket;
	}

	handle(packetObject, callback) {
		const result = this.doHandle(packetObject);
		callback(result);
	}

	doHandle(packetObject) {

	}

	static get name() {
		return "";
	}
}

module.exports = Packet;
