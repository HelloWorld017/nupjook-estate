import Packet from "./Packet";

class PacketGameJournal extends Packet {
	doHandle(journalObject) {
		this.store.commit('admin/addLogs', [journalObject]);
	}

	static get name() {
		return "game.journal";
	}
}

export default PacketGameJournal;
