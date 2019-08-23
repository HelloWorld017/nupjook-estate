<template>
	<div class="Panzoom" :class="{'Panzoom--grabbing': grabbing}" ref="root">
		<div class="Panzoom__scene" ref="scene">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Panzoom {
		position: relative;
		overflow: hidden;
		outline: none;
		
		cursor: grab;

		&--grabbing {
			cursor: grabbing;
		}

		&__scene {
			position: absolute;
		}
	}
</style>

<script>
	import panzoom from "panzoom";

	export default {
		props: {
			initialZoom: {
				type: Number,
				default: 0.3
			},

			maxZoom: {
				type: Number,
				default: 1
			},

			minZoom: {
				type: Number,
				default: 0.2
			}
		},

		data() {
			return {
				grabbing: false
			};
		},

		mounted() {
			this.$panzoom = panzoom(this.$refs.scene, {
				maxZoom: this.maxZoom,
				minZoom: this.minZoom,
				bounds: true
			});

			this.$panzoom.zoomAbs(
				0,
				0,
				this.initialZoom
			);

			this.$panzoom.on('panstart', () => {
				this.grabbing = true;
			});

			this.$panzoom.on('panend', () => {
				this.grabbing = false;
			});
		},

		beforeDestroy() {
			if(this.$panzoom) this.$panzoom.dispose();
		},
	}
</script>
