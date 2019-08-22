const AdminPacket = require('./AdminPacket');

class PacketSetPrice extends AdminPacket {
	doHandle({buildingUid, price}) {
		const building = this.game.buildings[buildingUid];
		if(!building) return {
			ok: false,
			reason: "No such building"
		};

		if(!isFinite(price)) return {
			ok: false,
			reason: "Wrong arguments"
		};

		this.game.buildings[buildingUid].price = price;

		this.game.addJournal(
			'admin.setPrice',
			{
				buildingUid,
				price
			}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "setPrice";
	}
}

module.exports = PacketSetPrice;
