import Packet from "./Packet";

class PacketUserUpdate extends Packet {
	doHandle({user}) {
		this.store.commit('updateUser', user);
	}

	static get name() {
		return "user.update";
	}
}

export default PacketUserUpdate;
