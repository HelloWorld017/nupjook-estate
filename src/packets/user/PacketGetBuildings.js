const UserPacket = require('./UserPacket');

class PacketGetBuildings extends UserPacket {
	doHandle(packetObject) {
		return {
			ok: true,
			buildings: this.game.buildingsList.map(building => building.buildingData)
		};
	}

	static get name() {
		return "getBuildings";
	}
}

module.exports = PacketGetBuildings;
