<template>
	<div class="PriceChange Section">
		<h2>Price Change</h2>

		<price-table class="PriceChange__content" :filter="filter" relax></price-table>
	</div>
</template>

<style lang="less" scoped>
	.PriceChange {
		&__content {
			width: 60vw;
			max-height: ~"calc(80vh - 200px)";
			overflow: auto;

			color: #fff;
			text-align: left;
			font-size: 1.2rem;
			font-family: 'Noto Sans KR', sans-serif;
		}
	}
</style>

<script>
	import PriceTable from "../PriceTable.vue";

	export default {
		computed: {
			filter() {
				return this.$store.state.nextRoundHandle.appliedEvents
					.reduce((prev, curr) => {
						curr.targets.forEach(uid => !prev.includes(uid) && prev.push(uid));
						return prev;
					}, []);
			}
		},

		components: {
			PriceTable
		}
	};
</script>
