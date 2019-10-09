<template>
	<div class="alert">
		<div class="content">
			<h2>提 示</h2>
			<p v-text="text"></p>
			<button @click="close">确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return { text: ''};
                },
                methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.alert
		position: fixed
		top: 0
		left: 0
		z-index: 999
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.5)
		.content
			position: absolute
			left: 50%
			top: 50%
			transform: translate(-50%,-50%)
			background-color: white
			min-width: 60%
			max-width: 80%
			border-radius: 0.1rem
			h2
				text-align: center
				background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
				color: white
				font-weight: 500
				padding: 0.15rem 0
				font-size: 0.3rem
			p
				margin: 0.4rem 0
				text-indent: 0.3rem
				color: #666
				font-size: 0.28rem
			button
				display: block
				margin: 0 auto
				margin-bottom: 0.2rem
				background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
				color: white
				font-size: 0.24rem
				padding: 0.12rem 0.3rem
				border-radius: 0.1rem
				border: none
				outmine: none
</style>