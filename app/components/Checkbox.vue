<template>
	<label class="Checkbox" :class="{'Checkbox--disabled': disabled}">
		<input type="checkbox" v-model="_value" :disabled="disabled">
		<div class="Checkbox__decorator"></div>
		<slot></slot>
	</label>
</template>

<style lang="less" scoped>
	.Checkbox {
		display: flex;
		align-items: center;
		cursor: pointer;
		font-family: 'Fira Sans', sans-serif;

		&__decorator {
			display: block;
			width: 10px;
			height: 10px;
			border: 2px solid #202020;
			border-radius: 50%;
			margin-right: 5px;

			transition: all .4s ease;
		}

		& > input[type="checkbox"] {
			position: absolute;
			opacity: 0;
			z-index: -1;
		}

		& > input[type="checkbox"]:checked + &__decorator {
			border-color: #202020;
			background: #202020;
		}

		&--disabled {
			cursor: not-allowed;

			&__decorator {
				border-color: #808080;
			}
		}

		&&--disabled > input[type="checkbox"]:checked + &__decorator {
			border-color: #808080;
			background: #808080;
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
			value: Boolean,
			disabled: Boolean
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
