<template>
	<div class="Event">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
	.Event {
		margin: 10px;
		padding: 10px;
		background: #e1e2e3;

		display: flex;
		align-items: center;

		font-family: 'Noto Sans KR', sans-serif;
		font-size: .9rem;
	}
</style>

<script>
	export default {
		props: {
			event: {
				type: Object,
				required: true
			}
		}
	};
</script>
