<template>
	<div class="JournalList">
		<h2 class="JournalList__title">
			Logs
		</h2>

		<transition-group class="JournalList__logs" name="FadeList" tag="div">
			<journal v-for="log in logs" class="JournalList__log"
				:key="log.logId" :log="log" :expanded="log.logId === expandedLog"
				@expand="expand(log.logId)">
			</journal>
		</transition-group>
	</div>
</template>

<style lang="less" scoped>
	.JournalList {
		overflow: auto;
		min-height: 0;
		flex: 1;

		&__logs {
			display: flex;
			flex-direction: column-reverse;
		}

		&__log {
			margin: 10px;
		}

		&__title {
			font-family: 'Fira Sans', sans-serif;
			margin: 0;
			margin-left: 20px;
			margin-bottom: 10px;
		}
	}


</style>

<script>
	import Journal from "./Journal.vue";

	export default {
		data() {
			return {
				expandedLog: null
			};
		},

		computed: {
			logs() {
				return this.$store.state.admin.logs;
			}
		},

		methods: {
			expand(logId) {
				if(this.expandedLog === logId)
					return this.expandedLog = null;

				this.expandedLog = logId;
			}
		},

		components: {
			Journal
		}
	};
</script>
