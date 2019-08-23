import Vuex from "vuex";

export default () => new Vuex.Store({
	state: {
		buildings: {},
		user: null,
		events: [],
		nextRoundTick: 0,
		nextRoundHandle: null,
		tick: 0,
		round: 0,
		labyrinth: null
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
		},

		updateLabyrinth(state, labyrinth) {
			state.labyrinth = labyrinth;
		},

		setRound(state, round) {
			state.round = round;
		}
	},

	actions: {
		nextRound({commit}, nextRoundInfo) {
			const {round, appliedEvents, buildingStatus, userData, labyrinth} = nextRoundInfo;

			commit('setRound', round);
			commit('updateLabyrinth', labyrinth);
			commit('addEvents', appliedEvents);
			commit('updateBuildings', buildingStatus);
			commit('updateUser', userData);
			commit('nextRound', nextRoundInfo);
		},

		initRound({commit}, initRoundInfo) {
			const {pastEvents, round, tick, roundLeft, labyrinth} = initRoundInfo;
			commit('setRound', round);
			commit('updateTimer', {tick, roundLeft});
			commit('updateLabyrinth', labyrinth);
			commit('addEvents', pastEvents);
		}
	}
});
