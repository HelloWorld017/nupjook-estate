<template>
	<div class="Labyrinth">
		<panzoom class="Labyrinth__panzoom" :initial-zoom="0.3" v-if="labyrinth" ref="panzoom">
			<img :src="labyrinthSrc" alt="Please refresh to see labyrinth" @load="requireRezoom">
		</panzoom>
	</div>
</template>

<style lang="less" scoped>
	.Labyrinth {
		flex: 1;
		padding: 20px;

		&__panzoom {
			width: 100%;
			height: 100%;
		}
	}
</style>

<script>
	import Panzoom from "./Panzoom.vue";

	export default {
		computed: {
			labyrinth() {
				return this.$store.state.labyrinth;
			},

			labyrinthSrc() {
				return `//${SERVER_ADDR}/labyrinth/${this.labyrinth.round}?key=${this.labyrinth.key}`;
			}
		},

		methods: {
			requireRezoom() {
				const panzoom = this.$refs.panzoom && this.$refs.panzoom.$panzoom;
				if(!panzoom) return;

				panzoom.zoomAbs(
					0,
					0,
					0.3
				);
			}
		},

		components: {
			Panzoom
		}
	};
</script>
