<template>
	<div class="Building" :class="[
		{'Building--large': large},
		{'Building--owning': owning},
		{'Building--sold': sold},
		{'Building--noprice': noprice},
		{'Building--place': place},
		groupClass
	]" :style="styleObject">
		{{building.uid}}

		<div class="Building__price" v-if="!noprice">
			<money :current="building.price" :last="building.lastPrice" :updown="!sold && !owning" :space="10"></money>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@colors: {
		west: #8BC34A;
		east: #FFC107;
		north: #F85B5B;
		etcetera: #00BCD4;
	}

	.Building {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;

		width: 180px;
		padding: 7px 14px;
		margin: 5px;

		font-family: 'Iosevka', monospace;
		font-weight: 800;
		font-size: 2rem;
		background: #202020;

		each(@colors, {
			&--@{key} {
				color: @value;
			}
		});

		&--noprice {
			justify-content: center;
		}

		&--large {
			flex-basis: 80px;
			font-size: 2rem;
			text-align: center;
			padding: 0;
		}

		&--owning& {
			color: #fff;

			each(@colors, {
				&--@{key} {
					background: @value;
				}
			});
		}

		&--owning & {
			&__price {
				color: #fff;
			}
		}

		&--sold {
			background: #d1d2d3;
			color: #989898;
		}

		&--place {
			position: absolute;
		}

		&__price {
			color: #989898;
		}
	}
</style>

<script>
	import Money from "./Money.vue";

	export default {
		props: {
			uid: {
				type: String,
				required: true
			},

			large: Boolean,
			noprice: Boolean,
			place: Boolean
		},

		computed: {
			building() {
				return this.$store.state.buildings[this.uid];
			},

			owning() {
				return this.$store.state.user.uid === this.building.owner;
			},

			sold() {
				return this.building.owner && !this.owning;
			},

			styleObject() {
				if(!this.place) return {};

				return {
					top: `${this.building.position.y}px`,
					left: `${this.building.position.x}px`
				};
			},

			groupClass() {
				return `Building--${this.building.group.toLowerCase().replace(/\s/g, '')}`;
			}
		},

		components: {
			Money
		}
	};
</script>
