const AdminPacket = require('./AdminPacket');

class PacketSetMoney extends AdminPacket {
	doHandle({userUid, money}) {
		const user = this.game.users[userUid];
		if(!user) return {
			ok: false,
			reason: "No such user"
		};

		user.money = money;

		this.game.addJournal(
			'admin.setMoney',
			{
				userUid, money
			}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "setMoney";
	}
}

module.exports = PacketSetMoney;
