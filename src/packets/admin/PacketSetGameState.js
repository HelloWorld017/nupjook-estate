const AdminPacket = require('./AdminPacket');

class PacketSetGameState extends AdminPacket {
	doHandle() {
		switch(this.game.state) {
			case 'not-started':
				this.game.start();
				this.game.addJournal('admin.startGame', {});
				break;

			case 'playing':
				this.game.pause();
				this.game.addJournal('admin.pauseGame', {});
				break;

			case 'paused':
				this.game.resume();
				this.game.addJournal('admin.resumeGame', {});
				break;
		}

		return {
			ok: true
		};
	}

	static get name() {
		return "setGameState";
	}
}

module.exports = PacketSetGameState;
