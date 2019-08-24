import io from "socket.io-client";
import iziToast from "izitoast";
import packets from "./packets";

export default store => new Promise(resolve => {
	const socket = io(SERVER_ADDR);
	packets(socket, store);

	socket.on('connect', () => resolve(socket));
	socket.on('disconnect', () => {
		iziToast.error({
			title: 'Disconnected',
			message: 'Disconnected from server! Should I reload?',
			position: 'center',
			timeout: false,
			buttons: [
				['<button>Reload</button>', () => location.reload()],
				['<button>Cancel</button>', (instance, toast) => instance.hide({}, toast)]
			]
		});
	});
});
