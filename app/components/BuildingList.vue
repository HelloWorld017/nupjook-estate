<template>
	<div class="BuildingList">
		<building v-for="building in buildings" :key="building" :uid="building"
			:alwaysown="!!buildingList" large noprice>
		</building>
	</div>
</template>

<style lang="less" scoped>
	.BuildingList {
		display: flex;
		flex-wrap: wrap;
		flex-shrink: 0;
		justify-content: center;
		padding: 10px;
		max-height: 20vh;

		overflow: auto;
	}
</style>

<script>
	import Building from "./Building.vue";

	export default {
		props: [
			'buildingList'
		],

		computed: {
			buildings() {
				if(this.buildingList) return this.buildingList;

				return this.$store.state.user.buildings;
			}
		},

		components: {
			Building
		}
	};
</script>
