import iziToast from "izitoast";

import Packet from "./Packet";

class PacketNotification extends Packet {
	doHandle({text}) {
		const textEscaped = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');

		iziToast.show({
			theme: 'dark',
			icon: 'ico-info',
			title: 'Notification',
			message: textEscaped,
			position: 'center',
			timeout: 10000
		})
	}

	static get name() {
		return "game.notification";
	}
}

export default PacketNotification;
