const UserPacket = require('./UserPacket');

class PacketGetRoundInfo extends UserPacket {
	doHandle(packetObject) {
		return {
			ok: true,
			pastEvents: this.game.events.filter(event => event.round < this.game.round)
				.map(event => event.eventData),
			round: this.game.round,
			tick: this.game.tick,
			roundLeft: this.game.nextRoundTick,
			labyrinth: this.game.enabledLabyrinth ?
				{
					key: this.game.enabledLabyrinth.key,
					round: this.game.enabledLabyrinth.round
				} : null,

			maxRounds: this.game.config['max-round']
		};
	}

	static get name() {
		return "getRoundInfo";
	}
}

module.exports = PacketGetRoundInfo;
