<template>
	<div class="EventEmergency Section">
		<h2>Emergency</h2>

		<p class="EventEmergency__content">
			{{event.content}}
		</p>

		<div class="EventEmergency__applies">
			Applies To:
			<div class="EventEmergency__buildings">
				<building v-for="uid in event.targets" :uid="uid" :key="uid" large noprice></building>
			</div>
		</div>

		<div class="EventEmergency__border"></div>

		<transition name="Opacity">
			<div class="EventEmergency__foredrop" v-if="open"></div>
		</transition>
		<audio src="./audio/ambulance_siren.wav" autoplay></audio>
	</div>
</template>

<style lang="less" scoped>
	.EventEmergency {
		align-items: flex-start !important;
		color: #fff;
		width: 60vw;

		&__content {
			width: 100%;
			text-align: left;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
		}

		&__applies {
			display: flex;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 700;
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
			background: #ff0000;
		}

		&__border {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;

			background-image: repeating-linear-gradient(to right, #ffc107 0%, #ffc107 50%, #202020 50%, #202020 100%),
				repeating-linear-gradient(to right, #ffc107 0%, #ffc107 50%, #202020 50%, #202020 100%);
			background-position: left top, left bottom;
			background-repeat: repeat-x, repeat-x;
			background-size: 100px 20px, 100px 20px;
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
