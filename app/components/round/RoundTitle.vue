<template>
	<div class="RoundTitle Section">
		<h1 class="RoundTitle__current">ROUND {{roundNumber}}</h1>
		<div class="RoundTitle__progress Progress">
			<div class="Progress__bar" :style="progressStyle"></div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.RoundTitle {
		&__current {
			color: #fff;
			font-size: 6vw;
			font-family: 'Museca', sans-serif;
			text-align: center;
			margin: 0;
			margin-bottom: 40px;
		}

		&__progress {
			width: 60vw;
		}
	}

	.Progress {
		height: 20px;
		background: #545454;

		&__bar {
			height: 20px;
			background: #fff;
		}
	}
</style>

<script>
	export default {
		computed: {
			roundNumber() {
				return this.$store.state.round;
			},

			progressStyle() {
				const progress = (this.roundNumber / this.$store.state.maxRounds) * 100;
				return `width: ${progress}%`;
			}
		}
	}
</script>
