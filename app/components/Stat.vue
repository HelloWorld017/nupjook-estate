<template>
	<div class="Stat">
		<span class="Stat__key">
			{{keyText}}
		</span>
		<span class="Stat__value">
			<slot></slot>
		</span>
	</div>
</template>

<style lang="less" scoped>
	.Stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0;

		&__key {
			font-family: 'Fira Sans', sans-serif;
			font-weight: 500;
			font-size: 1.4rem;
		}

		&__value {
			font-family: 'Iosevka', monospace;
			font-weight: 700;
			font-size: 2rem;
		}
	}
</style>

<script>
	export default {
		props: {
			keyText: {
				type: String,
				required: true
			}
		}
	};
</script>
