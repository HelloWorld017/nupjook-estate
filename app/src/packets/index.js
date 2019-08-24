import PacketBuildingUpdate from "./PacketBuildingUpdate";
import PacketGameJournal from "./PacketGameJournal";
import PacketNextRound from "./PacketNextRound";
import PacketTick from "./PacketTick";
import PacketUserUpdate from "./PacketUserUpdate";
import PacketUserUpdateAdmin from "./PacketUserUpdateAdmin";

const packets = [
	PacketBuildingUpdate,
	PacketGameJournal,
	PacketNextRound,
	PacketTick,
	PacketUserUpdate,
	PacketUserUpdateAdmin
];

export default function applyPackets(socket, store) {
	packets.forEach(PacketClass => {
		const packet = new PacketClass(store);

		socket.on(PacketClass.name, (payload) => {
			packet.handle(payload);
		});
	});
}
