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
				const totalSecs = Math.floor(this.$store.state.nextRoundTick / 4);
				const mins = Math.floor(totalSecs / 60);
				const secs = totalSecs % 60;
				const secsPadded = secs.toString().length < 2 ? `0${secs}` : `${secs}`;

				return `${mins}:${secsPadded}`;
			}
		},

		components: {
			Stat
		}
	};
</script>
