<template>
	<div class="MainView">
		<section class="MainView__col">
			<status></status>
			<transition name="Fade" mode="out-in">
				<component :is="mainTab"></component>
			</transition>
			<div class="MainView__tab">
				<tab-button @click="tabIndex = 0" :active="tabIndex === 0">Map + Labyrinth</tab-button>
				<tab-button @click="tabIndex = 1" :active="tabIndex === 1">Map + Table</tab-button>
				<tab-button @click="tabIndex = 2" :active="tabIndex === 2">Table + Labyrinth</tab-button>
				<tab-button @click="tabIndex = 3" :active="tabIndex === 3">Labyrinth + Table</tab-button>
			</div>
		</section>

		<section class="MainView__col MainView__col--secondary">
			<building-list></building-list>
			<transition name="Fade" mode="out-in">
				<component :is="subTab"></component>
			</transition>
		</section>

		<next-round></next-round>
	</div>
</template>

<style lang="less" scoped>
	.MainView {
		display: flex;
		width: 80vw;
		height: 100vh;

		&__col {
			display: flex;
			flex-direction: column;
			min-width: 0;

			flex: 3;

			&--secondary {
				flex: 2;
			}
		}

		&__tab {
			display: flex;
			margin: 10px 0;

			& > * {
				margin: 0 3px;
				font-size: .6rem;
			}
		}
	}
</style>

<script>
	import BuildingList from "./BuildingList.vue";
	import Kaimap from "./Kaimap.vue";
	import Labyrinth from "./Labyrinth.vue";
	import NextRound from "./round/NextRound.vue";
	import PriceTable from "./PriceTable.vue";
	import Status from "./Status.vue";
	import TabButton from "./TabButton.vue";

	export default {
		data() {
			return {
				tabIndex: 0
			};
		},

		computed: {
			mainTab() {
				switch(this.tabIndex) {
					case 0:
					case 1: return 'kaimap';
					case 2: return 'price-table';
					case 3: return 'labyrinth';
				}
			},

			subTab() {
				switch(this.tabIndex) {
					case 0: return 'labyrinth';
					case 1: return 'price-table';
					case 2: return 'labyrinth';
					case 3: return 'price-table';
				}
			}
		},

		components: {
			BuildingList,
			Kaimap,
			Labyrinth,
			NextRound,
			PriceTable,
			Status,
			TabButton
		}
	};
</script>
