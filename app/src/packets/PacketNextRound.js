import Packet from "./Packet";

class PacketNextRound extends Packet {
	doHandle(nextRoundInfo) {
		this.store.dispatch('nextRound', nextRoundInfo);
	}

	static get name() {
		return "game.nextround";
	}
}

export default PacketNextRound;
