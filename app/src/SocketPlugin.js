const SocketPlugin = {
	socket: null,

	install(Vue) {
		Vue.prototype.$packet = (packetName, payload = {}) => {
			return new Promise((resolve, reject) => {
				if(!this.socket)
					return reject(new Error("Socket didn't initialized!"));

				console.log("Packet Departure:", packetName, payload);

				this.socket.emit(packetName, payload, result => {
					console.log("Packet Arrival:", packetName, result);
					if(result.ok)
						return resolve(result);

					return reject(new Error(result.reason));
				});
			});
		};
	}
}

export default SocketPlugin;
