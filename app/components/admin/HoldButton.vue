<template>
	<button class="HoldButton" :class="{'HoldButton--holding': isHoldMode}"
		@mousedown="startHold" @mouseup="cancelHold" @mouseleave="cancelHold">

		<div class="HoldButton__progress" :class="{
			'HoldButton__progress--hidden': !isHoldMode
		}" :style="{
			width: `${percentage}%`,
			background: color
		}"></div>

		<div class="HoldButton__content">
			<slot></slot>
		</div>
	</button>
</template>

<style lang="less" scoped>
	.HoldButton {
		background: #e8e8e8;
		cursor: grab;
		position: relative;
		display: inline-block;
		padding: 0;

		&--holding {
			cursor: grabbing;
		}

		&__progress {
			height: 100%;

			position: absolute;
			top: 0;
			left: 0;
			opacity: 1;

			transition: all .4s ease;

			&--hidden {
				opacity: 0;
			}
		}

		&__content {
			color: #202020;
			padding: 10px 20px;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				intervalId: null,
				start: 0,
				current: 0,
				isHoldMode: false
			};
		},

		props: {
			color: {
				type: String,
				default: '#00bcd4'
			},

			length: {
				type: Number,
				default: 2000
			}
		},

		computed: {
			percentage() {
				const elapsed = this.current - this.start;
				return Math.floor((elapsed / this.length) * 90) + 10;
			}
		},

		methods: {
			startHold() {
				if(this.intervalId) {
					this.cancelHold();
				}

				this.start = Date.now();
				this.current = Date.now();

				this.intervalId = setInterval(() => {
					this.current = Date.now()

					if(this.percentage > 100) {
						this.cancelHold();
						this.$emit('hold');
					}
				}, 100);

				this.isHoldMode = true;
			},

			cancelHold() {
				if(!this.isHoldMode) return;

				if(this.intervalId) {
					clearInterval(this.intervalId);
				}

				this.current = this.start;
				this.isHoldMode = false;
			}
		}
	};
</script>
