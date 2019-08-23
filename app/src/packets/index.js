import PacketBuildingUpdate from "./PacketBuildingUpdate";
import PacketNextRound from "./PacketNextRound";
import PacketTick from "./PacketTick";
import PacketUserUpdate from "./PacketUserUpdate";

const packets = [
	PacketBuildingUpdate,
	PacketNextRound,
	PacketTick,
	PacketUserUpdate
];

export default function applyPackets(socket, store) {
	packets.forEach(PacketClass => {
		const packet = new PacketClass(store);

		socket.on(PacketClass.name, (payload) => {
			packet.handle(payload);
		});
	});
}
