<template>
	<div class="BuildingTable">
		<div class="BuildingTable__rows">
			<div class="BuildingTable__row"
				v-for="building in buildingsSorted"
				:key="building.uid" :title="building.name">

				<building class="BuildingTable__building" :uid="building.uid" alwaysown large noprice></building>
				<span class="BuildingTable__name">
					{{building.name}}
				</span>

				<span class="BuildingTable__price">
					<money :current="building.price" :last="building.lastPrice" updown></money>
				</span>

				<div class="BuildingTable__sellbuy">
					<template v-if="building.owner">
						<hold-button @hold="sellBuilding(building.uid)" :length="500">
							{{getUserName(building.owner)}} / Sell
						</hold-button>
					</template>
					<template v-else>
						<drop-class @drop="buyBuilding(building.uid, $event)">
							Unowned / Buy
						</drop-class>
					</template>
				</div>
			</div>
		</div>

		<div class="BuildingTable__search">
			Search
			<text-input v-model="search"></text-input>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.BuildingTable {
		padding: 0 20px;
		margin: 20px 0;

		min-height: 0;
		flex: 1;
		overflow: auto;

		&__building {
			font-size: 1.2rem;
			flex-basis: 60px;
			margin-right: 10px;
		}

		&__row {
			display: flex;
			align-items: center;
			padding-left: 5px;
			padding-right: 10px;
			margin-top: 5px;
		}

		&__name {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-family: 'Fira Sans', sans-serif;
			font-weight: 400;
		}

		&__price {
			font-family: 'Iosevka', monospace;
			font-weight: bold;
			margin: 0 10px;
			font-weight: 400;
		}

		&__sellbuy {
			width: 180px;

			button {
				width: 100%;
			}
		}

		&__search {
			display: flex;
			flex-direction: row;
			align-items: center;

			position: sticky;
			bottom: 0;
			max-width: 200px;
			margin: 0 auto;
			margin-bottom: 20px;
			padding: 10px;

			font-family: 'Fira Sans', sans-serif;
			font-weight: 500;
			background: #f1f2f3;

			input {
				min-width: 0;
				flex-shrink: 1;
				margin-left: 10px;
			}
		}
	}
</style>

<script>
	import Building from "../Building.vue";
	import DropClass from "./DropClass.vue";
	import HoldButton from "./HoldButton.vue";
	import Money from "../Money.vue";
	import TextInput from "../TextInput.vue";

	import wrapAdmin from "../../src/wrapAdmin";

	export default {
		data() {
			return {
				search: ''
			};
		},

		computed: {
			userid() {
				return this.$store.state.user.uid;
			},

			buildings() {
				const buildings = Object.values(this.$store.state.buildings);

				if(this.search.length === 0)
					return buildings;

				return buildings.filter(building => {
					if(building.uid.includes(this.search)) return true;
					if(building.name.includes(this.search)) return true;
					return false;
				});
			},

			buildingsSorted() {
				return this.buildings
					.sort((a, b) => a.name.localeCompare(b.name))
					.sort((a, b) => a.group.localeCompare(b.group));
			}
		},

		methods: {
			getUserName(userUid) {
				const users = this.$store.state.admin.users;
				if(!users || !users[userUid]) {
					return 'Unknown User';
				}

				return users[userUid].name;
			},

			async buyBuilding(buildingUid, userUid) {
				await wrapAdmin(
					this.$packet('buyBuilding', {userUid, buildingUid}),
					'buying building'
				);
			},

			async sellBuilding(buildingUid) {
				await wrapAdmin(
					this.$packet('sellBuilding', {
						userUid: this.$store.state.buildings[buildingUid].owner,
						buildingUid
					}),
					'selling building'
				);
			}
		},

		components: {
			Building,
			DropClass,
			HoldButton,
			Money,
			TextInput
		}
	};
</script>
