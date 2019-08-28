<template>
	<main id="app" class="App">
		<template v-if="user && user.isAdmin">
			<admin-view></admin-view>
		</template>

		<template v-else-if="user">
			<sidebar></sidebar>
			<main-view></main-view>
		</template>

		<template v-else>
			<login></login>
			<a class="App__credit" @click="credit = true">
				Credit
			</a>
			
			<transition name="Opacity">
				<credit v-if="credit" @close="credit = false"></credit>
			</transition>
		</template>
	</main>
</template>

<style lang="less">
	body, html {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	button {
		cursor: pointer;
		padding: 10px 20px;
		background: #202020;
		border: none;
		outline: none;
		color: #f1f2f3;
		font-family: 'Noto Sans KR', sans-serif;
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

	*::selection {
		background: rgba(32, 32, 32, .8);
		color: #fff;
	}
</style>

<style lang="less" scoped>
	.App {
		display: flex;
		
		&__credit {
			cursor: pointer;
			position: fixed;
			font-family: 'Noto Sans KR', sans-serif;
			font-size: .7rem;
			right: 15px;
			bottom: 15px;
		}
	}
</style>

<script>
	import AdminView from "./components/admin/AdminView.vue";
	import Credit from "./components/Credit.vue";
	import Login from "./components/Login.vue";
	import MainView from "./components/MainView.vue";
	import Sidebar from "./components/Sidebar.vue";

	export default {
		data() {
			return {
				credit: false
			};
		},
		
		components: {
			AdminView,
			Credit,
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
