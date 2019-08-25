const AdminPacket = require('./AdminPacket');

class PacketSetPrice extends AdminPacket {
	doHandle({buildingUid, price}) {
		price = parseInt(price);

		const building = this.game.buildings[buildingUid];
		if(!building || !building.uid) return {
			ok: false,
			reason: "No such building"
		};

		if(!isFinite(price) || price < 0) return {
			ok: false,
			reason: "Wrong arguments"
		};

		this.game.buildings[buildingUid].price = parseInt(price);

		this.game.addJournal(
			'admin.setPrice',
			{
				buildingUid,
				price
			}
		);

		this.game.broadcastPacket(
			'building.update',
			{building: this.game.buildings[buildingUid].buildingData}
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
