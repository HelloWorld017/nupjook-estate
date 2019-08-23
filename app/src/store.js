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
		maxRounds: 8,
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
			if(!labyrinth) return;
			state.labyrinth = labyrinth;
		},

		setRound(state, round) {
			state.round = round;
		},

		setMaxRounds(state, maxRounds) {
			state.maxRounds = maxRounds;
		}
	},

	getters: {
		valuation(state) {
			return state.user.buildings.reduce((prev, bldgUid) => {
				return prev + state.buildings[bldgUid].price;
			}, state.user.money);
		},

		labyrinthUrl(state) {
			return `//${SERVER_ADDR}/labyrinth/${state.labyrinth.round}?key=${state.labyrinth.key}`;
		}
	},

	actions: {
		nextRound({commit, getters}, nextRoundInfo) {
			const {round, appliedEvents, buildingStatus, userData, labyrinth} = nextRoundInfo;
			nextRoundInfo.oldValuation = getters.valuation;

			commit('setRound', round);
			commit('updateLabyrinth', labyrinth);
			commit('addEvents', appliedEvents);
			commit('updateBuildings', buildingStatus);
			commit('updateUser', userData);
			commit('nextRound', nextRoundInfo);
		},

		initRound({commit}, initRoundInfo) {
			const {pastEvents, round, maxRounds, tick, roundLeft, labyrinth} = initRoundInfo;
			commit('setRound', round);
			commit('updateTimer', {tick, roundLeft});
			commit('updateLabyrinth', labyrinth);
			commit('addEvents', pastEvents);
			commit('setMaxRounds', maxRounds);
		}
	}
});
