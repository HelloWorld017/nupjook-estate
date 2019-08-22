import Vuex from "vuex";

export default () => new Vuex.Store({
	state: {
		buildings: {},
		user: null,
		events: [],
		nextRoundTick: 0,
		nextRoundHandle: null,
		tick: 0,
		round: 0
	},

	mutations: {
		updateTimer(state, {tick, roundLeft}) {
			state.nextRoundTick = roundLeft;
			state.tick = tick;
		},

		updateUser(state, userData) {
			state.user = userData;
		},

		updateBuilding(state, buildingData) {
			state.buildings[buildingData.uid] = buildingData;
		},

		updateBuildings(state, buildings) {
			const updateBuildings = {};
			buildings.forEach(buildingData => {
				updateBuildings[buildingData.uid] = buildingData;
			});

			state.buildings = Object.assign({}, state.buildings, updateBuildings);
		},

		nextRound(state, nextRoundInfo) {
			state.nextRoundHandle = nextRoundInfo;
		},

		nextRoundHandled(state) {
			state.nextRoundHandle = null;
		},

		addEvents(state, events) {
			state.events.push(...events);
		}
	},

	actions: {
		nextRound({commit}, nextRoundInfo) {
			const {round, appliedEvents, buildingStatus, userData} = nextRoundInfo;

			commit('nextRound', nextRoundInfo);
			commit('updateBuildings', buildingStatus);
			commit('updateUser', userData);
			commit('addEvents', appliedEvents);
		}
	}
});
