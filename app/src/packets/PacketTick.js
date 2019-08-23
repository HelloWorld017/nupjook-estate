import Packet from "./Packet";

class PacketTick extends Packet {
	doHandle(timerInfo) {
		this.store.commit('updateTimer', timerInfo);
	}

	static get name() {
		return "game.tick";
	}
}

export default PacketTick;
