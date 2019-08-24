import Packet from "./Packet";

class PacketUserUpdateAdmin extends Packet {
	doHandle({user}) {
		this.store.commit('admin/updateUsers', [user]);
	}

	static get name() {
		return "user.updateAsAdmin";
	}
}

export default PacketUserUpdateAdmin;
