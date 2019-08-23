<template>
	<transition-group class="Money" name="FadeList" tag="div">
		<anim-number v-for="(text, index) in computedText"
			:class="index === computedText.length - 1 && lastStyle ? lastStyle : ''"
			:number="text" :key="computedText.length - index">
		</anim-number>
	</transition-group>
</template>

<style lang="less" scoped>
	.Money {
		display: inline-flex;
	}
</style>

<script>
	import AnimNumber from "./AnimNumber.vue";

	export default {
		props: {
			current: Number,
			last: Number,
			updown: Boolean
		},

		computed: {
			computedText() {
				const base = this.current.toString();

				if(!this.last)
					return base;

				const diff = this.current - this.last;
				if(diff > 0)
					return base + '▲';

				if(diff === 0)
					return base + '━';

				if(diff < 0)
					return base + '▼';

				return base;
			},

			lastStyle() {
				if(!this.updown) return '';

				switch(this.computedText[this.computedText.length - 1]) {
					case '▲': return 'Money__up';
					case '━': return 'Money__nochange';
					case '▼': return 'Money__down';
				}
			}
		},

		components: {
			AnimNumber
		}
	};
</script>
