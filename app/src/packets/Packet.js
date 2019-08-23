class Packet {
	constructor(store) {
		this.store = store;
		this.name = this.constructor.name;
	}

	handle(packetObject, callback) {
		this.doHandle(packetObject);
	}

	doHandle(packetObject) {

	}

	static get name() {
		return "";
	}
}

export default Packet;
