<template>
	<div class="Inspect">
		<h1 class="Inspect__name">{{user.name}}</h1>

		<div class="Inspect__money">
			<div class="Inspect__row">
				Money: {{user.money}}
			</div>

			<div class="Inspect__row">
				Valuation: {{valuation}}
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Inspect {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		background: rgba(0, 0, 0, .8);

		&__row {
			color: #fff;
		}

		// TODO
	}
</style>

<script>
	export default {
		props: {
			uid: {
				type: String,
				required: true
			}
		},

		computed: {
			user() {
				return this.$store.state.admin.users[this.uid];
			},

			valuation() {
				return this.user.buildings.reduce((prev, bldgUid) => {
					return prev + this.$store.state.buildings[bldgUid].price;
				}, this.user.money);
			}
		}
	};
</script>
