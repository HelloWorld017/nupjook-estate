<template>
	<div class="AnimNumber">
		<transition name="Number" mode="out-in">
			<span v-for="i in numTexts" v-if="i === number" :key="i">
				{{i}}
			</span>
		</transition>
	</div>
</template>

<style lang="less" scoped>
	.Number {
		&-enter {
			transform: translateY(-60px);
			opacity: 0;

			&-active {
				transition: all .4s ease;
			}
		}

		&-leave {
			&-active {
				transition: all .4s ease;
			}

			&-to {
				transform: translateY(60px);
				opacity: 0;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				numTexts: [...Array(10)].map((v, i) => `${i}`).concat(['▲', '━', '▼'])
			};
		},

		props: ['number']
	};
</script>
