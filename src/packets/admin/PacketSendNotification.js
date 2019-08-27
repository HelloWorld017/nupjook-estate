const AdminPacket = require('./AdminPacket');

class PacketSendNotification extends AdminPacket {
	doHandle({text, target}) {
		let targets = this.game.socketsList;

		if(target && this.game.users[target] && this.game.users[target].uid) {
			targets = [this.game.users[target]];
		}

		targets.forEach(user => {
			if(user.socket)
				user.socket.emit('game.notification', {text});
		});

		this.game.addJournal(
			'game.sendNotification',
			{targets: targets.map(user => user.uid), text}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "sendNotification";
	}
}

module.exports = PacketSendNotification;
