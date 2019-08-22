class PacketAuthAdmin {
	doHandle({token}) {
		if(!this.game.config['admin-token'] === token) return {
				ok: false,
				reason: 'Wrong Token!'
			};

		const admin = this.game.addAdmin();
		admin.connectSocket(this.socket);
	}

	static get name() {
		return "authAdmin";
	}
}

module.exports = PacketAuthAdmin;
