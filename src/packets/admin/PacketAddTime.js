const AdminPacket = require('./AdminPacket');

class PacketAddTime extends AdminPacket {
	doHandle({amount}) {
		if(!isFinite(amount)) {
			return {
				ok: false,
				reason: 'Wrong Argument'
			};
		}

		this.game.nextRoundTick += amount;

		this.game.addJournal(
			'admin.addTime',
			{
				amount,
				left: this.game.nextRoundTick
			}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "addTime";
	}
}

module.exports = PacketAddTime;
