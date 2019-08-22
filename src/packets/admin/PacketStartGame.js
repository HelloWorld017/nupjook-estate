const AdminPacket = require('./AdminPacket');

class PacketStartGame{
	doHandle() {
		this.game.start();
		this.game.addJournal(
			'admin.startGame',
			{}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "startGame";
	}
}

module.exports = PacketStartGame;
