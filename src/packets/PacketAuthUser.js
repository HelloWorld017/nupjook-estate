class PacketAuthUser {
	doHandle({userUid, token}) {
		const user = this.game.users[userUid];
		if(!user) return {
				ok: false,
				reason: 'No such user!'
			};

		if(user.token !== token) return {
				ok: false,
				reason: 'Wrong Token!'
			};

		user.connectSocket(this.socket);
	}

	static get name() {
		return "authUser";
	}
}

module.exports = PacketAuthUser;
