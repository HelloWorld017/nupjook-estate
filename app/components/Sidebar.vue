<template>
	<aside class="Sidebar">
		<h1 class="Sidebar__name" @click="deauthenticate">
			{{name}}<br>
			<span class="Sidebar__round">
				Round {{round}}
			</span>
		</h1>

		<h2 class="Sidebar__subtitle">
			Events
		</h2>

		<div class="Sidebar__events">
			<transition-group name="FadeList" tag="div">
				<event v-for="event in events"
					class="Sidebar__event" :key="event.eventId" :event="event">

					{{event.content}}
				</event>
			</transition-group>
		</div>
	</aside>
</template>

<style lang="less" scoped>
	.Sidebar {
		display: flex;
		flex-direction: column;
		width: 20vw;
		height: 100vh;
		box-sizing: border-box;
		background: #edeeef;
		font-family: 'Fira Sans', sans-serif;

		&__name {
			cursor: pointer;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			height: 128px;
			font-size: 2rem;
			margin: 0;
		}

		&__round {
			font-size: 1.3rem;
		}

		&__subtitle {
			font-size: 1.7rem;
			padding: 0 20px;
			margin-top: 0;
			margin-bottom: 20px;
		}

		&__events {
			padding: 20px 0;
			display: flex;
			flex-direction: column-reverse;
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
			},

			round() {
				return this.$store.state.round;
			}
		},

		methods: {
			deauthenticate() {
				localStorage.removeItem('authenticate');
			}
		},

		components: {
			Event
		}
	};
</script>
