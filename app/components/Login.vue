<template>
	<form class="Login" @submit.prevent="authenticate">
		<span class="Login__error" v-if="error">
			{{error}}
		</span>

		<div class="Login__row">
			<span class="Login__text">User ID</span>
			<text-input v-model="uid"></text-input>
		</div>

		<div class="Login__row">
			<span class="Login__text">Password</span>
			<text-input v-model="password" type="password"></text-input>
		</div>

		<button class="Login__button">
			Login
		</button>
	</form>
</template>

<style lang="less" scoped>
	.Login {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300px;
		padding: 30px;
		transform: translate(-50%, -50%);

		&__error {
			font-family: 'Noto Sans KR', sans-serif;
			color: #f04015;
		}

		&__row {
			display: flex;
			align-items: center;
			font-family: 'Noto Sans KR', sans-serif;

			& > * {
				flex: 2;
				margin: 5px 10px;
			}

			& > input {
				flex: 4;
				min-width: 0;
			}
		}

		&__button {
			margin-top: 50px;
		}
	}
</style>

<script>
	import TextInput from "./TextInput.vue";

	export default {
		data() {
			return {
				error: '',
				uid: '',
				password: ''
			};
		},

		methods: {
			async authenticate() {
				try {
					if(this.uid === 'admin') {
						await this.$packet('authAdmin', {
							token: this.password
						});
					} else {
						await this.$packet('authUser', {
							userUid: this.uid,
							token: this.password
						});
					}
				} catch(err) {
					this.error = err.message;
					return;
				}

				const {buildings} = await this.$packet('getBuildings');
				this.$store.commit('updateBuildings', buildings);

				const {user} = await this.$packet('getMe');
				this.$store.commit('updateUser', user);

				const initRoundInfo = await this.$packet('getRoundInfo');
				this.$store.dispatch('initRound', initRoundInfo);

				if(user.isAdmin) {
					const {journals} = await this.$packet('getJournals');
					this.$store.commit('admin/addLogs', journals);

					const {users} = await this.$packet('getUsers');
					this.$store.commit('admin/updateUsers', users);
				}
			}
		},

		//FIXME Remove this before production
		mounted() {
			/*this.uid = 'admin';
			this.password = 'asdf';
			this.authenticate();*/
		},

		components: {
			TextInput
		}
	};
</script>
