<template>
	<div class="EventNormal Section">
		<h2>Event</h2>

		<p class="EventNormal__content">
			{{event.content}}
		</p>

		<div class="EventNormal__applies">
			Applies To:
			<div class="EventNormal__buildings">
				<building v-for="uid in event.targets" :uid="uid" :key="uid" large noprice></building>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.EventNormal {
		align-items: flex-start !important;
		color: #fff;
		width: 60vw;

		&__content {
			width: 100%;
			text-align: left;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
		}

		&__applies {
			display: flex;
			font-size: 2rem;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 700;
		}

		&__buildings {
			display: flex;
			flex-wrap: wrap;
			flex: 1;
			margin-left: 10px;
		}
	}
</style>

<script>
	import Building from "../Building.vue";

	export default {
		props: {
			event: {
				type: Object,
				required: true
			}
		},

		 components: {
			 Building
		 }
	};
</script>
