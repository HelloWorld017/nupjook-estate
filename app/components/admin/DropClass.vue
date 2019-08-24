<template>
	<div class="DropClass" @dragover.prevent @drop="drop">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
	.DropClass {
		padding: 10px 20px;
		border: 1px solid #202020;
		border-radius: 5px;
		color: #202020;
		font-family: 'Fira Sans', sans-serif;
		text-align: center;
	}
</style>

<script>
	export default {
		methods: {
			drop(event) {
				if(!event.dataTransfer) return;

				const data = event.dataTransfer.getData('text/x-nupjook-user');
				if(!data) return;

				const match = data.match(/^UserUid\/(.*);$/);
				if(!match) return;

				this.$emit('drop', match[1]);
			}
		}
	};
</script>
