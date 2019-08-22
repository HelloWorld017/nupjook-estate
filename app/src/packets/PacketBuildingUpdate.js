import Packet from "./Packet";

class PacketBuildingUpdate extends Packet {
	doHandle({building}) {
		this.store.commit('updateBuilding', building);
	}

	static get name() {
		return "building.update";
	}
}

export default PacketBuildingUpdate;
