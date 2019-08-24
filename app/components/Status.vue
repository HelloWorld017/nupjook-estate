<template>
	<header class="Status">
		<stat key-text="Round Left">
			{{roundLeft}}
		</stat>

		<stat key-text="Money">
			{{money}}
		</stat>

		<stat key-text="Valuation">
			{{valuation}}
		</stat>
	</header>
</template>

<style lang="less" scoped>
	.Status {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20px 0;
	}
</style>

<script>
	import Stat from "./Stat.vue";

	export default {
		computed: {
			money() {
				return this.$store.state.user.money;
			},

			valuation() {
				return this.$store.getters.valuation;
			},

			roundLeft() {
				return this.$store.getters.roundLeft;
			}
		},

		components: {
			Stat
		}
	};
</script>
