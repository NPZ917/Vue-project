<template>
	<div class="count">
		<button class="iconfont icon-decrease" :class="{ disabled: count === 1 }" :disabled="count === 1" @click="decrease"></button>
		<span class="count" v-text="count"></span>
		<button class="iconfont icon-increase" :class="{ disabled: count === 5 }" :disabled="count === 5" @click="increase"></button>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        count: Number,
                        increase: Function,
                        decrease: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.count
		span,button
			display: inline-block
			width: 0.52rem
			height: 0.4rem
			line-height: 0.4rem
			text-align: center
			font-size: 0.26rem
			border: none
			color: black
			&:before
				color: black
			&.disabled
				color: #b0b0b0
			&.disabled:before
				color: #b0b0b0
			&.count
				background-color: rgb(244,244,244)
</style>