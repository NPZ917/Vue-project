<template>
	<p v-text="text" class="notice"></p>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return { text: '' };
                },
//	        //挂载前
//	        beforeMount() {},
	        //挂载后
	        mounted() {
                        setTimeout(() => {
                                this.$destroy(true);                                                    //销毁组件对象
                                this.$el.parentNode.removeChild(this.$el);              //销毁组件对应的dom
                        }, 2000);
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	p.notice
		position: fixed
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		background-color: #000
		color: #fff
		font-size: 0.28rem
		padding: 0.1rem 0.2rem
		border-radius: 0.08rem
</style>