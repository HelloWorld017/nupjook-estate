<template>
	<main id="app">
		<template v-if="user">
			<sidebar></sidebar>
			<main-view></main-view>
		</template>

		<template v-else>
			<login></login>
		</template>
	</main>
</template>

<style lang="less">
	body, html {
		margin: 0;
		padding: 0;
	}

	button {
		cursor: pointer;
		padding: 10px 20px;
		background: #202020;
		border: none;
		outline: none;
		color: #f1f2f3;
		font-family: 'Noto Sans KR', sans-serif;
		font-weight: 200px;
	}

	.FadeList {
		&-enter {
			opacity: 0;
			transform: translateX(-30px);
		}

		&-leave {
			&-to {
				opacity: 0;
				transform: translateX(30px);
			}

			&-active {
				position: absolute;
			}
		}

		&-move {
			transition: all .4s ease;
		}
	}
</style>

<script>
	import Login from "./components/Login.vue";
	import MainView from "./components/MainView.vue";
	import Sidebar from "./components/Sidebar.vue";

	export default {
		components: {
			Login,
			MainView,
			Sidebar
		},

		computed: {
			user() {
				return this.$store.state.user;
			}
		}
	};
</script>
