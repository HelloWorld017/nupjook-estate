<template>
	<input v-if="!multiline" :type="type" v-model="_value" class="TextInput"
		autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
		@blur="$emit('blur', $event)">

	<textarea v-else v-model="_value" class="TextInput"
		autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
		@blur="$emit('blur', $event)">
	</textarea>
</template>

<style lang="less" scoped>
	.TextInput {
		font-family: 'Noto Sans KR', sans-serif;
		font-size: 1.2rem;
		padding: 5px 10px;
		background: transparent;
		border: none;
		border-bottom: 2px solid #202020;
		outline: none;
		resize: none;

		&::selection {
			background: #202020;
			color: #f1f2f3;
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'value',
			event: 'change'
		},

		props: {
			value: {},
			type: {
				type: String,
				default: 'text'
			},
			multiline: Boolean
		},

		computed: {
			_value: {
				get() {
					return this.value;
				},

				set(value) {
					this.$emit('change', value);
				}
			}
		}
	};
</script>
