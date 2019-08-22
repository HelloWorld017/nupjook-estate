class Packet {
	constructor(store) {
		this.store = store;
		this.name = this.constructor.name;
	}

	handle(packetObject, callback) {
		const result = this.doHandle(packetObject);
		callback(result);
	}

	doHandle(packetObject) {

	}

	static get name() {
		return "";
	}
}

export default Packet;
