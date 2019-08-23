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

			&-active {
				transition: all .4s ease;
			}
		}

		&-leave {
			&-to {
				opacity: 0;
				transform: translateX(30px);
			}

			&-active {
				position: absolute;
				transition: all .4s ease;
			}
		}

		&-move {
			transition: all .4s ease;
		}
	}

	.Fade {
		&-enter {
			opacity: 0;
			transform: translateX(-30px);

			&-active {
				transition: all .4s ease;
			}
		}

		&-leave {
			&-to {
				opacity: 0;
				transform: translateX(30px);
			}

			&-active {
				transition: all .4s ease;
			}
		}
	}

	.Opacity {
		&-enter {
			opacity: 0;

			&-active {
				transition: all .4s ease;
			}
		}

		&-leave {
			&-to {
				opacity: 0;
			}

			&-active {
				transition: all .4s ease;
			}
		}
	}
</style>

<style lang="less" scoped>
	#app {
		display: flex;
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
