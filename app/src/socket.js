import io from "socket.io-client";
import packets from "./packets";

export default store => new Promise(resolve => {
	const socket = io(SERVER_ADDR);
	packets(socket, store);

	socket.on('connect', () => resolve(socket));
});
