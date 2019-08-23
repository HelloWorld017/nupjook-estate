<template>
	<div class="Kaimap">
		<panzoom class="Kaimap__wrapper">
			<img class="Kaimap__image" src="../images/kaimap.jpg">
			<div class="Kaimap__bldgs">
				<building v-for="(building, uid) in buildings" v-if="!showOwn || building.owner === userid"
					:uid="uid" :key="uid" place>
				</building>
			</div>
		</panzoom>

		<div class="Kaimap__options">
			<checkbox v-model="showOwn">
				Show buildings only you own
			</checkbox>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Kaimap {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;

		&__wrapper {
			flex: 1;
		}

		&__image {
			width: 2000px;
			height: 1229px;
		}

		&__options {
			margin-top: 5px;
			margin-left: 5px;
		}
	}
</style>

<script>
	import Building from "./Building.vue";
	import Checkbox from "./Checkbox.vue";
	import Panzoom from "./Panzoom.vue";

	export default {
		data() {
			return {
				showOwn: false
			};
		},

		computed: {
			buildings() {
				return this.$store.state.buildings;
			},

			userid() {
				return this.$store.state.user.uid;
			}
		},

		components: {
			Building,
			Checkbox,
			Panzoom
		}
	};
</script>
