const AdminPacket = require('./AdminPacket');

class PacketBuyBuilding extends AdminPacket {
	doHandle({userUid, buildingUid}) {
		const user = this.game.users[userUid];
		if(!user || !user.uid) return {
			ok: false,
			reason: "No such user"
		};

		try {
			user.buyBuilding(buildingUid);

			return {
				ok: true
			};

		} catch(err) {
			return {
				ok: false,
				reason: err.message
			};
		}
	}

	static get name() {
		return "buyBuilding";
	}
}

module.exports = PacketBuyBuilding;
