<template>
	<button @click="click">{{ value }}</button>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        value: {
                                type: String,
	                        default: '确定'
                        },
	                click: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	button
		display: block
		margin: 0.5rem 0
		width: 100%
		height: 0.7rem
		line-height: 0.7rem
		color: #fff
		font-size: 0.28rem
		background: linear-gradient(to left,#FBAA58 0,#FA4DBE 100%)
		border-radius: 0.6rem
		border: none;
		outline: none
</style>