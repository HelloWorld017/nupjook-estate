<template>
	<div class="NewLabyrinth Section">
		<div class="NewLabyrinth__view" :style="{
				'backgroundImage': `url('${labyrinthUrl}')`
			}">
		</div>

		<span class="NewLabyrinth__text">
			New Labyrinth
		</span>
	</div>
</template>

<style lang="less" scoped>
	.NewLabyrinth {
		&__view {
			width: 70vw;
			height: 70vh;
			background-size: contain;
			background-position: center center;
			background-repeat: no-repeat;
		}

		&__text {
			margin-top: 20px;
			color: #fff;
			font-family: 'Noto Sans CJK KR', sans-serif;
			font-size: 2rem;
			text-transform: uppercase;
		}
	}
</style>

<script>
	export default {
		computed: {
			labyrinthUrl() {
				return this.$store.getters.labyrinthUrl;
			}
		}
	};
</script>
