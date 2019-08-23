<template>
	<div class="Kaimap">
		<div class="Kaimap__wrapper" :class="{'Kaimap--grabbing': grabbing}" ref="root">
			<div class="Kaimap__scene" ref="scene">
				<img src="../images/kaimap.jpg">
				<div class="Kaimap__bldgs">
					<building v-for="(building, uid) in buildings" v-if="!showOwn || building.owner === userid"
						:uid="uid" :key="uid" place>
					</building>
				</div>
			</div>
		</div>

		<div class="Kaimap__options">
			<checkbox v-model="showOwn">
				Show buildings only you own
			</checkbox>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Kaimap {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		cursor: grab;

		&--grabbing {
			cursor: grabbing;
		}

		&__wrapper {
			flex: 1;
		}

		&__scene {
			position: absolute;
			width: 2000px;
			height: 1229px;
		}
	}
</style>

<script>
	import Building from "./Building.vue";
	import Checkbox from "./Checkbox.vue";

	import panzoom from "panzoom";

	export default {
		data() {
			return {
				showOwn: false,
				grabbing: false
			};
		},

		computed: {
			buildings() {
				return this.$store.state.buildings;
			},

			userid() {
				return this.$store.state.user.uid;
			}
		},

		mounted() {
			this.$panzoom = panzoom(this.$refs.scene, {
				maxZoom: 1,
				minZoom: 0.2,
				bounds: true
			});

			this.$panzoom.zoomAbs(
				0,
				0,
				0.3
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

		components: {
			Building,
			Checkbox
		}
	};
</script>
