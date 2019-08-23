<template>
	<div class="BuildingList">
		<!--<building v-for="building in buildings" :key="building" :uid="building" large noprice>-->
		<building v-for="i in 23" :key="i" uid="W8" large noprice>
		</building>
	</div>
</template>

<style lang="less" scoped>
	.BuildingList {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 10px;

		overflow: auto;
	}
</style>

<script>
	import Building from "./Building.vue";

	export default {
		computed: {
			buildings() {
				return this.$store.state.user.buildings;
			}
		},

		components: {
			Building
		}
	};
</script>
