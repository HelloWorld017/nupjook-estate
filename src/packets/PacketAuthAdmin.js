const Packet = require('./Packet');

class PacketAuthAdmin extends Packet {
	doHandle({token}) {
		if(this.game.config['admin-token'] !== token)
			return {
				ok: false,
				reason: 'Wrong Token!'
			};

		const admin = this.game.addAdmin();
		admin.connectSocket(this.socket);

		return {
			ok: true
		};
	}

	static get name() {
		return "authAdmin";
	}
}

module.exports = PacketAuthAdmin;
