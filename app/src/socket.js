import io from "socket.io-client";
import packets from "./packets";

//FIXME Remove address when production
const SERVER_ADDR = 'localhost:3000';

export default store => new Promise(resolve => {
	const socket = io(SERVER_ADDR);
	packets(socket, store);

	socket.on('connect', () => resolve(socket));
});
