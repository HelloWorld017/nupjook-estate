<template>
	<div class="PriceTable" :class="{'PriceTable--relax': relax}">
		<div class="PriceTable__row" v-for="building in buildingsFiltered" :key="building.uid" :title="building.name">
			<building class="PriceTable__building" :uid="building.uid" large noprice></building>
			<span class="PriceTable__name">
				{{building.name}}
			</span>
			<span class="PriceTable__price">
				<template v-if="building.lastPrice">
					<money :current="building.lastPrice"></money>
					<i class="PriceTable__arrow">-&gt;</i>
				</template>
				<money :current="building.price" :last="building.lastPrice" updown></money>
			</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.PriceTable {
		overflow: auto;

		&__building {
			font-size: 1.2rem;
			flex-basis: 60px;
		}

		&__row {
			display: flex;
			align-items: center;
			padding-left: 5px;
			padding-right: 10px;
		}

		&__name {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-family: 'Fira Sans', sans-serif;
			font-weight: 500;
		}

		&__price {
			font-family: 'Iosevka', monospace;
			font-weight: bold;
		}

		&--relax & {
			&__name {
				font-weight: 400;
			}

			&__building {
				margin-right: 10px;
			}

			&__price {
				margin-left: 10px;
				font-weight: 400;
			}
		}
	}
</style>

<script>
	import Building from "./Building.vue";
	import Money from "./Money.vue";

	export default {
		props: {
			filter: {
				type: Array,
				default() {
					return [];
				}
			},

			relax: Boolean
		},

		computed: {
			userid() {
				return this.$store.state.user.uid;
			},

			buildings() {
				if(this.filter.length === 0)
					return Object.values(this.$store.state.buildings);

				return this.filter.map(v => this.$store.state.buildings[v]);
			},

			buildingsFiltered() {
				return this.buildings
					.sort((a, b) => a.name.localeCompare(b.name))
					.sort((a, b) => a.group.localeCompare(b.group))
					.sort((a, b) => +(b.owner === this.userid) - +(a.owner === this.userid));
			}
		},

		components: {
			Building,
			Money,
		}
	};
</script>
