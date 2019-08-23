<template>
	<div class="AssetChange Section">
		<h2>Assets</h2>

		<div class="AssetChange__content">
			<span class="AssetChange__fig">
				Valuation
			</span>

			<money class="AssetChange__money" :current="current" :last="last" updown :space="10"></money>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.AssetChange {
		&__content {
			display: flex;
			flex-direction: column;
			align-items: center;

			font-family: 'Noto Sans KR', sans-serif;
			color: #fff;
			font-size: 2rem;
			font-weight: 400;
		}

		&__money {
			font-size: 4rem;
			font-family: 'Iosevka', monospace;
		}
	}
</style>

<script>
	import Money from "../Money.vue";

	export default {
		data() {
			return {
				changed: false
			};
		},

		computed: {
			last() {
				if(!this.changed) return 0;
				return this.oldMoney;
			},

			current() {
				if(!this.changed) return this.oldMoney;
				return this.money;
			},

			money() {
				return this.$store.getters.valuation;
			},

			oldMoney() {
				return this.$store.state.nextRoundHandle.oldValuation;
			}
		},

		mounted() {
			setTimeout(() => this.changed = true, 500);
		},

		components: {
			Money
		}
	};
</script>
