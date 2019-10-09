<template>
	<div class="confirm" @click.self="close">
		<div class="content">
			<img :src="titleImg" alt="">
			<p v-text="text"></p>
			<button @click="ok">确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import titleImg from './icon.png';
        export default {
                data() {
                        return {
                                text:'',
                                titleImg,
                                resolve: null
                        };
                },
                methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        },
                        ok() {
                                this.resolve();
                                this.close();
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.confirm
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
			min-width: 65%
			max-width: 85%
			border-radius: 0.1rem
			p
				font-size: 0.3rem
				text-indent: 0.2rem
				color: rgb(132,132,132)
				padding: 0.4rem 0.2rem 0.4rem
			img
				display: block
				margin: 0 auto
				width: 2rem
				margin-top: 0.4rem
			button
				display: block
				width: 100%
				padding: 0.2rem 0
				text-align: center
				color: rgb(130, 192, 208)
				font-size: 0.32rem
				background-color: transparent
				border: none
				border-top: 1px solid #b0b0b0

</style>
