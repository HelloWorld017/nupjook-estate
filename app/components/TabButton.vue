<template>
	<button class="TabButton" :class="{'TabButton--active': active}" :style="style" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<style lang="less" scoped>
	.TabButton {
		background: #e8e8e8;
		transition: all .4s ease;
	}
</style>

<script>
	export default {
		props: {
			color: {
				type: String,
				default: '#202020'
			},

			active: Boolean
		},

		computed: {
			style() {
				if(this.active) {
					return {
						background: this.color,
						color: '#fff'
					};
				}

				return {
					color: this.color
				};
			}
		}
	};
</script>
