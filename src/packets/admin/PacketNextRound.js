const AdminPacket = require('./AdminPacket');

class PacketNextRound extends AdminPacket {
	doHandle() {
		this.game.nextRoundTick = 0;

		this.game.addJournal(
			'admin.nextRound',
			{}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "nextRound";
	}
}

module.exports = PacketNextRound;
