<template>
	<transition name="Opacity">
		<section class="NextRound" v-if="nextRoundHandle" @click="nextSlide">
			<div class="NextRound__slide">
				<transition name="Opacity" mode="out-in">
					<round-title key="title" v-if="display === 0"></round-title>
					<component v-for="(event, index) in appliedEvents"
						v-if="display === index + 1"
						:is="getComponentByEvent(event)"
						:event="event"
						:key="`event-${event.eventId}`">
					</component>

					<price-change key="price" v-if="display === appliedEvents.length + 1"></price-change>
					<asset-change key="asset" v-if="display === appliedEvents.length + 2"></asset-change>
					<new-labyrinth key="labyrinth" v-if="newLabyrinth && display === appliedEvents.length + 3">
					</new-labyrinth>
				</transition>
			</div>

			<span class="NextRound__fakebutton">
				NEXT
			</span>
		</section>
	</transition>
</template>

<style lang="less" scoped>
	.NextRound {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);

		&__fakebutton {
			cursor: pointer;
			color: #fff;
			position: absolute;
			bottom: 20px;
			right: 30px;
			font-family: 'Noto Sans CJK KR', sans-serif;
			font-weight: 900;
			font-size: 1.7rem;
		}

		&__slide {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
</style>

<style lang="less">
	.NextRound {
		.Section {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			h2 {
				color: #fff;
				font-family: 'Museca', sans-serif;
				font-size: 2rem;
				position: absolute;
				top: 100px;
				left: 5vw;
				text-transform: uppercase;
			}
		}
	}
</style>

<script>
	import AssetChange from "./AssetChange.vue";
	import EventCelebration from "./EventCelebration.vue";
	import EventEmergency from "./EventEmergency.vue";
	import EventNormal from "./EventNormal.vue";
	import NewLabyrinth from "./NewLabyrinth.vue";
	import PriceChange from "./PriceChange.vue";
	import RoundTitle from "./RoundTitle.vue";

	export default {
		data() {
			return {
				display: 0
			};
		},

		computed: {
			appliedEvents() {
				if(!this.nextRoundHandle) return [];
				return this.nextRoundHandle.appliedEvents;
			},

			nextRoundHandle() {
				return this.$store.state.nextRoundHandle;
			},

			newLabyrinth() {
				if(!this.nextRoundHandle) return null;
				return this.$store.state.nextRoundHandle.labyrinth;
			}
		},

		methods: {
			getComponentByEvent(event) {
				if(event.tags.includes('emergency'))
					return 'event-emergency';

				if(event.tags.includes('celebration'))
					return 'event-celebration';

				return 'event-normal';
			},

			nextSlide() {
				this.display++;

				if(this.display > this.appliedEvents.length + (this.newLabyrinth ? 3 : 2)) {
					this.display = 0;
					this.$store.commit('nextRoundHandled');
				}
			}
		},

		components: {
			AssetChange,
			EventCelebration,
			EventEmergency,
			EventNormal,
			NewLabyrinth,
			PriceChange,
			RoundTitle
		}
	};
</script>
