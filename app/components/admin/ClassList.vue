<template>
	<div class="ClassList">
		<div class="ClassList__class"
			v-for="(user, userUid) in users"
			@dragstart="dragStart($event, userUid)" draggable>

			{{user.name}}
		</div>
	</div>
</template>

<style lang="less" scoped>
	.ClassList {
		margin-top: 10vh;

		&__class {
			cursor: move;
			padding: 10px 20px;
			margin: 5px 0;
			background: #e8e8e8;
			color: #202020;
			font-family: 'Noto Sans KR', sans-serif;
		}
	}
</style>

<script>
	export default {
		computed: {
			users() {
				return this.$store.state.admin.users;
			}
		},

		methods: {
			dragStart(event, uid) {
				event.dataTransfer.setData('text/x-nupjook-user', `UserUid/${uid};`);
			}
		}
	};
</script>
