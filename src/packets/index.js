const PacketAuthAdmin = require('./PacketAuthAdmin');
const PacketAuthUser = require('./PacketAuthUser');

const adminPackets = require('./admin');
const userPackets = require('./user');
const defaultPackets = [
	PacketAuthAdmin,
	PacketAuthUser
];

module.exports = function applyPackets(game, socket, packets, context) {
	if(!context) context = socket;

	packets.forEach(PacketClass => {
		const packet = new PacketClass(game, context);

		socket.on(PacketClass.name, (payload, callback) => {
			packet.handle(payload, callback);
		});
	});
}

module.exports.admin = adminPackets;
module.exports.user = userPackets;
module.exports.default = defaultPackets;
