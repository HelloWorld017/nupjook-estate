<template>
	<div class="EventCelebration Section">
		<h2>Celebration</h2>

		<p class="EventCelebration__content">
			{{event.content}}
		</p>

		<div class="EventCelebration__applies">
			Applies To:
			<div class="EventCelebration__buildings">
				<building v-for="uid in event.targets" :uid="uid" :key="uid" large noprice></building>
			</div>
		</div>

		<iframe class="EventCelebration__foredrop" src="/firework.html" seamless></iframe>
	</div>
</template>

<style lang="less" scoped>
	.EventCelebration {
		align-items: flex-start !important;
		color: #fff;
		width: 60vw;

		&__content {
			width: 100%;
			text-align: left;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
			padding: 10px;
			background: rgba(0, 0, 0, .8);
		}

		&__applies {
			display: flex;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 700;
			padding: 10px;
			background: rgba(0, 0, 0, .8);
		}

		&__buildings {
			display: flex;
			flex-wrap: wrap;
			flex: 1;
			margin-left: 10px;
		}

		&__foredrop {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			border: none;
			z-index: -1;
		}
	}
</style>

<script>
	import Building from "../Building.vue";

	export default {
		data() {
			return {
				open: true
			};
		},

		props: {
			event: {
				type: Object,
				required: true
			}
		},

		 components: {
			 Building
		 },

		 mounted() {
			 setTimeout(() => this.open = false, 1000);
		 }
	};
</script>
