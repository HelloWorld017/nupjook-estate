<template>
	<aside class="Sidebar">
		<h1 class="Sidebar__name">
			{{name}}
		</h1>

		<h2 class="Sidebar__subtitle">
			Events
		</h2>

		<div class="Sidebar__events">
			<transition-group name="FadeList" tag="div">
				<event v-for="event in events"
					class="Sidebar__event" :key="event.eventId" :event="event">

					{{content}}
				</event>
			</transition-group>
		</div>
	</aside>
</template>

<style lang="less" scoped>
	.Sidebar {
		display: flex;
		flex-direction: column;
		max-width: 20vw;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;
		background: #edeeef;
		font-family: 'Fira Sans', sans-serif;

		&__name {
			text-align: center;
			padding: 20px 0;
			font-size: 3rem;
			margin: 0;
		}

		&__events {
			overflow: auto;
			flex: 1;
		}
	}
</style>

<script>
	import Event from "./Event.vue";

	export default {
		computed: {
			name() {
				return this.$store.state.user.name;
			},

			events() {
				return this.$store.state.events;
			}
		},

		components: {
			Event
		}
	};
</script>
