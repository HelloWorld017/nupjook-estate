import Vuex from "vuex";

export default () => {
	const admin = {
		namespaced: true,

		state: {
			logs: [],
			users: {}
		},

		mutations: {
			addLogs(state, logs) {
				logs.forEach(log => log.logId = Math.random().toString(36).slice(2));
				state.logs.push(...logs);
			},

			updateUsers(state, users) {
				const updateUsers = {};
				users.forEach(userData => {
					updateUsers[userData.uid] = userData;
				});

				state.users = Object.assign({}, state.users, updateUsers);
			}
		}
	};

	return new Vuex.Store({
		state: {
			buildings: {},
			user: null,
			events: [],
			nextRoundTick: 0,
			nextRoundHandle: null,
			tick: 0,
			gameState: 'not-playing',
			round: 0,
			maxRounds: 8,
			labyrinth: null
		},

		mutations: {
			updateTimer(state, {tick, roundLeft, gameState}) {
				state.gameState = gameState;
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
				if(!state.user) return 0;

				return state.user.buildings.reduce((prev, bldgUid) => {
					return prev + state.buildings[bldgUid].price;
				}, state.user.money);
			},

			labyrinthUrl(state) {
				if(!state.labyrinth) return '';
				
				return `//${SERVER_ADDR}/labyrinth/${state.labyrinth.round}?key=${state.labyrinth.key}`;
			},

			roundLeft(state) {
				const totalSecs = Math.floor(state.nextRoundTick / 4);
				const mins = Math.floor(totalSecs / 60);
				const secs = totalSecs % 60;
				const secsPadded = secs.toString().length < 2 ? `0${secs}` : `${secs}`;

				return `${mins}:${secsPadded}`;
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
				const {pastEvents, round, maxRounds, tick, roundLeft, gameState, labyrinth} = initRoundInfo;
				commit('setRound', round);
				commit('updateTimer', {tick, roundLeft, gameState});
				commit('updateLabyrinth', labyrinth);
				commit('addEvents', pastEvents);
				commit('setMaxRounds', maxRounds);
			}
		},

		modules: {
			admin
		}
	});
};
