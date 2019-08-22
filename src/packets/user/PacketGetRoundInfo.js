const UserPacket = require('./UserPacket');

class PacketGetRoundInfo extends UserPacket {
	doHandle(packetObject) {
		return {
			ok: true,
			pastEvents: this.events.filter(event => event.round < this.round),
			round: this.game.round,
			tick: this.game.tick,
			roundLeft: this.game.nextRoundTick
		};
	}

	static get name() {
		return "getRoundInfo";
	}
}

module.exports = PacketGetRoundInfo;
