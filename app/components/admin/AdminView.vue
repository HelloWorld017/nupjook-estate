<template>
	<div class="AdminView">
		<aside class="AdminView__sidebar">
			<h1 class="AdminView__title">
				<span class="AdminView__round">
					{{round}}R
				</span>

				<span class="AdminView__left">
					{{roundLeft}}
				</span>
			</h1>

			<journal-list></journal-list>
		</aside>

		<section class="AdminView__mainview">
			<div class="AdminView__contents">
				<div class="AdminView__edit">
					<div class="AdminView__row EditRow">
						<span class="EditRow__name">Minutes</span>
						<text-input class="EditRow__edit" type="number" v-model="addTimeMinutes"></text-input>
						<hold-button @hold="addTime">Add Time</hold-button>
					</div>

					<div class="AdminView__row EditRow">
						<span class="EditRow__name">Name</span>
						<text-input class="EditRow__edit" v-model="addUserName"></text-input>
						<hold-button @hold="addUser">Add User</hold-button>
					</div>

					<div class="AdminView__row EditRow">
						<span class="EditRow__name">Building UID</span>
						<text-input class="EditRow__edit" v-model="setPriceUid"></text-input>
						<span class="EditRow__name">New Price</span>
						<text-input class="EditRow__edit" type="number" v-model="setPricePrice"></text-input>
						<hold-button @hold="setPrice">Set Price</hold-button>
					</div>
					<building-table></building-table>
				</div>

				<div class="AdminView__options">
					<hold-button @hold="startPlayPauseGame">{{startPlayPauseText}}</hold-button>
					<class-list></class-list>
					<drop-class @drop="inspectingUser = $event">
						Drop to inspect user
					</drop-class>
				</div>
			</div>
		</section>
		<inspect class="AdminView__inspect" v-if="inspectingUser"
			:uid="inspectingUser" @close="inspectingUser = null">
		</inspect>
	</div>
</template>

<style lang="less" scoped>
	.AdminView {
		display: flex;
		width: 100vw;
		height: 100vh;

		&__sidebar {
			display: flex;
			flex-direction: column;
			width: 20%;
			background: #edeeef;
		}

		&__title {
			margin: 0;
			padding: 20px 0;
			text-align: center;
			font-size: 3rem;
		}

		&__round {
			font-family: 'Fira Sans', sans-serif;
			font-weight: 200;
		}

		&__left {
			font-family: 'Iosevka', monospace;;
			font-weight: 700;
		}

		&__mainview {
			flex: 1;
			min-width: 0;
		}

		&__contents {
			display: flex;
			height: 100%;
		}

		&__edit {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-width: 0;
		}

		&__row {
			margin-top: 20px;
			margin-left: 20px;
			max-width: 500px;
		}

		&__options {
			min-width: 20vw;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin: 20px 0;

			& > .HoldButton {
				margin-right: 20px;
			}

			& > .ClassList {
				flex: 1;
			}
		}
	}

	.EditRow {
		display: flex;
		align-items: center;

		&__name {
			font-family: 'Fira Sans', sans-serif;
			margin-right: 10px;
		}

		&__edit {
			flex: 1;
			min-width: 0;
			margin-right: 10px;
		}

		button {
			width: 120px;
		}
	}
</style>

<script>
	import BuildingTable from "./BuildingTable.vue";
	import ClassList from "./ClassList.vue";
	import DropClass from "./DropClass.vue";
	import HoldButton from "./HoldButton.vue";
	import Inspect from "./Inspect.vue";
	import JournalList from "./JournalList.vue";
	import TextInput from "../TextInput.vue";

	import wrapAdmin from "../../src/wrapAdmin";

	export default {
		data() {
			return {
				addTimeMinutes: 0,
				addUserName: '',
				setPriceUid: '',
				setPricePrice: 0,
				inspectingUser: null
			};
		},

		computed: {
			round() {
				return this.$store.state.round;
			},

			roundLeft() {
				return this.$store.getters.roundLeft;
			},

			startPlayPauseText() {
				switch(this.$store.state.gameState) {
					case 'not-started':
						return 'Start Game';

					 case 'playing':
					 	return 'Pause Game';

					case 'paused':
						return 'Resume Game';
				}
			}
		},

		methods: {
			async addTime() {
				const minutes = parseInt(this.addTimeMinutes) * 4 * 60;
				await wrapAdmin(
					this.$packet('addTime', {amount: minutes}),
					'adding time'
				);
			},

			async addUser() {
				const retval = await wrapAdmin(
					this.$packet('addUser', {name: this.addUserName}),
					'adding user'
				);

				if(!retval) return;

				const {token, uid} = retval;
				alert(`UserID: ${uid}, Token: ${token}`);
			},

			async startPlayPauseGame() {
				await wrapAdmin(
					this.$packet('setGameState'),
					'setting game state'
				);
			},

			async setPrice() {
				await wrapAdmin(
					this.$packet('setPrice', {buildingUid: this.setPriceUid, price: this.setPricePrice}),
					'setting price'
				);
			}
		},

		components: {
			BuildingTable,
			ClassList,
			DropClass,
			HoldButton,
			Inspect,
			JournalList,
			TextInput
		}
	};
</script>
