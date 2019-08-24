const AdminPacket = require('./AdminPacket');

class PacketSetMoney extends AdminPacket {
	doHandle({userUid, money}) {
		money = parseInt(money);

		const user = this.game.users[userUid];
		if(!user) return {
			ok: false,
			reason: "No such user"
		};

		if(!isFinite(money) || money < 0) return {
			ok: false,
			reason: "Wrong arguments"
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
