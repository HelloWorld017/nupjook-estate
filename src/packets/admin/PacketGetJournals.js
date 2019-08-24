const AdminPacket = require('./AdminPacket');

class PacketGetJournals extends AdminPacket {
	doHandle() {
		return {
			ok: true,
			journals: this.game.journals.slice(-this.game.config['max-journal-replay'])
		};
	}

	static get name() {
		return "getJournals";
	}
}

module.exports = PacketGetJournals;
