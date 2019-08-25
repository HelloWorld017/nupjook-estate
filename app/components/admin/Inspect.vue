<template>
	<div class="Inspect">
		<div class="Inspect__content">
			<div class="Inspect__column">
				<h1 class="Inspect__name">{{user.name}}</h1>
				<div class="Inspect__section Inspect__money">
					<h2>Assets</h2>
					<div class="Inspect__row">
						Money: {{user.money}}
					</div>

					<div class="Inspect__row">
						Valuation: {{valuation}}
					</div>

					<div class="Inspect__row EditRow">
						<text-input class="EditRow__edit" type="number" v-model="setMoneyValue"></text-input>
						<hold-button @hold="setMoney">Set Money</hold-button>
					</div>
				</div>

				<div class="Inspect__section Inspect__buildings">
					<h2>Buildings</h2>
					<div class="Inspect__row Inspect__row--inflate EditRow EditRow--vertical">
						<span class="EditRow__name">JSON Array of Building UIDs</span>
						<text-input class="Inspect__json EditRow__edit" v-model="setBuildingsJson" multiline>
						</text-input>
						<hold-button @hold="setBuildings">Set Buildings</hold-button>
					</div>
				</div>
			</div>

			<div class="Inspect__column Inspect__bldglist">
				<building-list :building-list="user.buildings"></building-list>
			</div>
		</div>

		<a class="Inspect__close" @click="$emit('close')">
			&times;
		</a>
	</div>
</template>

<style lang="less" scoped>
	.Inspect {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		background: rgba(0, 0, 0, .8);
		display: flex;
		justify-content: center;
		align-items: center;

		&__name {
			margin: 0;
		}

		&__section {
			display: flex;
			flex-direction: column;
			margin-left: 15px;

			h2 {
				margin: 30px 0;
			}
		}

		&__content {
			display: flex;
			align-items: stretch;
			width: 75vw;
			height: 75vh;
			color: #fff;
			font-family: 'Noto Sans KR', sans-serif;
		}

		&__column {
			padding: 20px;
			display: flex;
			flex-direction: column;
		}

		&__row {
			color: #fff;

			.TextInput {
				border-color: #fff;
				color: #fff;
			}

			&--inflate {
				flex: 1;
			}
		}

		&__json {
			font-family: 'Iosevka', monospace;
		}

		&__buildings {
			flex: 1;
		}

		&__bldglist {
			flex: 1;
		}

		&__close {
			cursor: pointer;
			position: absolute;
			top: 10vh;
			right: 10vw;

			color: #808080;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 100;
			font-size: 2.3rem;
		}
	}
</style>

<script>
	import BuildingList from "../BuildingList.vue";
	import HoldButton from "./HoldButton.vue";
	import TextInput from "../TextInput.vue";

	import wrapAdmin from "../../src/wrapAdmin";

	export default {
		data() {
			return {
				setMoneyValue: 0,
				setBuildingsJson: '[]'
			};
		},

		props: {
			uid: {
				type: String,
				required: true
			}
		},

		computed: {
			user() {
				return this.$store.state.admin.users[this.uid];
			},

			valuation() {
				return this.user.buildings.reduce((prev, bldgUid) => {
					return prev + this.$store.state.buildings[bldgUid].price;
				}, this.user.money);
			}
		},

		methods: {
			setMoney() {
				wrapAdmin(
					this.$packet('setMoney', {
						userUid: this.uid,
						money: this.setMoneyValue
					}),

					'setting money'
				);
			},

			setBuildings() {
				wrapAdmin(
					(async () => {
						const json = JSON.parse(this.setBuildingsJson);
						return await this.$packet('setOwnedBuildings', {
							userUid: this.uid,
							buildings: json
						});
					})(),

					'setting buildings'
				);
			}
		},

		components: {
			BuildingList,
			HoldButton,
			TextInput
		}
	};
</script>
