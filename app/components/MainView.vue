<template>
	<div class="MainView">
		<section class="MainView__col">
			<status></status>
			<transition name="FadeList" mode="out-in">
				<component :is="mainTab"></component>
			</transition>
			<div class="MainView__tab">
				<tab-button @click="tabIndex = 0" :active="tabIndex === 0">Map + Labyrinth</tab-button>
				<tab-button @click="tabIndex = 1" :active="tabIndex === 1">Map + Table</tab-button>
				<tab-button @click="tabIndex = 2" :active="tabIndex === 2">Table + Labyrinth</tab-button>
			</div>
		</section>

		<section class="MainView__col MainView__col--secondary">
			<building-list></building-list>
			<transition name="FadeList" mode="out-in">
				<component :is="subTab"></component>
			</transition>
		</section>
	</div>
</template>

<style lang="less" scoped>
	.MainView {
		display: flex;
		flex: 1;

		&__col {
			display: flex;
			flex-direction: column;

			flex: 3;

			&--secondary {
				flex: 2;
			}
		}

		&__tab {
			margin: 10px 0;
		}
	}
</style>

<script>
	import BuildingList from "./BuildingList.vue";
	import Kaimap from "./Kaimap.vue";
	import Labyrinth from "./Labyrinth.vue";
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
				}
			},

			subTab() {
				switch(this.tabIndex) {
					case 0: return 'labyrinth';
					case 1: return 'price-table';
					case 2: return 'labyrinth';
				}
			}
		},

		components: {
			BuildingList,
			Kaimap,
			Labyrinth,
			Status,
			TabButton
		}
	};
</script>
