<template>
	<section class="Credit">
		<div class="Credit__content">
			<div class="Credit__row">
				<h2 class="Credit__title">Game Created by 2019 KAIST Freshman Fall Orientation Planning Team</h2>
			</div>
			
			<div class="Credit__row">
				<h2 class="Credit__title">Web Interface Created by @Khinenw</h2>
			</div>
			
			<div class="Credit__row">
				<h2 class="Credit__title">Museca Font Imitated by @shiftpsh (under Creative Commons)</h2>
			</div>
			
			<div class="Credit__row">
				<h2 class="Credit__title">Firework Effect by MillerTime (under MIT)</h2>
				
				Copyright (c) 2019 by Caleb Miller (https://codepen.io/MillerTime/pen/XgpNwb)

				Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

				The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

				THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
			</div>
		</div>
		
		<a class="Credit__close" @click="$emit('close')">
			&times;
		</a>
	</section>
</template>

<style lang="less" scoped>
	.Credit {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		background: rgba(0, 0, 0, .8);
		display: flex;
		align-items: center;
		justify-content: center;
		
		overflow: auto;
		
		&__content {
			width: 75vw;
			height: 75vh;
			color: #fff;
			font-family: 'Noto Sans KR', sans-serif;
		}
		
		&__row {
			margin: 30px 0;
			white-space: pre-line;
			font-size: .8rem;
		}
		
		&__close {
			cursor: pointer;
			position: absolute;
			top: 10vh;
			right: 10vw;

			color: #808080;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight: 100;
			font-size: 2.3rem;
		}
		
		&__title {
			margin: 0;
		}
	}
</style>

<script>
	export default {};
</script>
