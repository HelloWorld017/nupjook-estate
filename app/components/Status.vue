<template>
	<header class="Status">
		<stat key-text="Round Left">
			{{roundLeft}}
		</stat>

		<stat key-text="Money">
			<money :current="money" updown></money>
		</stat>

		<stat key-text="Valuation">
			<money :current="valuation" updown></money>
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
	import Money from "./Money.vue";
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
			Money,
			Stat
		}
	};
</script>
