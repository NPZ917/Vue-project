<template>
	<div class="input">
		<input :type="type" :placeholder="placeholder" @input="e => $emit('change', e.target.value)">
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        type: {
                                type: String,
	                        default: 'text'
                        },
	                placeholder: {
                                type: String,
		                default: '请输入..'
	                }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.input
		display: flex
		align-items: center
		height: 1.1rem
		border-bottom: 1px solid #d3d3d3
		input
			flex-grow: 1
			border: none
			outline: none
			font-size: 0.28rem
			color: #4a4a4a
			&::-webkit-input-placeholder
				color: rgb(153,153,153)
</style>