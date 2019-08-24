<template>
	<div class="Journal" :class="{'Journal--expanded': expanded}"
		:style="expanded ? `max-height: ${height}px` : ''"
		@click="$emit('expand')">

		<h3 class="Journal__title">
			{{log.name}}
		</h3>

		<pre class="Journal__content">{{getPayload(log.payload)}}</pre>
	</div>
</template>

<style lang="less" scoped>
	.Journal {
		padding: 10px;
		background: #e1e2e3;
		max-height: 100px;
		overflow: hidden;
		border: 3px solid transparent;
		transition: all .4s ease;

		&__title {
			font-family: 'Fira Sans', san-serif;
			margin: 0;
			margin-top: 5px;
			margin-left: 5px;
		}

		&__content {
			font-family: 'Iosevka', monospace;
			tab-size: 4;
		}

		&--expanded {
			overflow-x: auto;
			border-color: #00bcd4;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				height: 100
			};
		},

		props: {
			log: {
				type: Object,
				required: true
			},

			expanded: Boolean
		},

		methods: {
			getPayload(payload) {
				return JSON.stringify(payload, null, '\t');
			}
		},

		mounted() {
			this.height = this.$el.scrollHeight;
		}
	};
</script>
