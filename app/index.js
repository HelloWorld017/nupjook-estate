import "izitoast/dist/css/iziToast.css";

import openSocket from "./src/socket";
import createStore from "./src/store";

import App from "./App.vue";
import SocketPlugin from "./src/SocketPlugin";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(SocketPlugin);
Vue.use(Vuex);

(async () => {
	const store = createStore();
	const socket = await openSocket(store);
	SocketPlugin.socket = socket;

	new Vue({
		el: '#app',
		store,
		render(h) {
			return h(App);
		}
	});

	window.$nupjooksEstate = {
		store, socket
	};
})();
