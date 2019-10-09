<template>
	<div class="popup" v-show="isShow" @click.self="$emit('close')">
		<div class="content"  :class="{ top:align ==='top', bottom: align ==='bottom' }">
			<i class="iconfont icon-close" v-if="align === 'bottom'" @click="$emit('close')"></i>
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        isShow: Boolean,
                        align: {
                                type: String,
                                default: 'bottom'
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.popup
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 800
		background-color: rgba(0,0,0,0.7)
		.content
			position: absolute
			left: 0
			background-color: white
			width: 100%
			&.top
				top: 0
				border-radius: 0 0 0.08rem 0.08rem
			&.bottom
				bottom: 0
				border-radius: 0.08rem 0.08rem 0 0
			i.icon-close
				position: absolute
				top: 0
				right: 0
				width: 0.86rem
				height: 0.86rem
				line-height: 0.86rem
				text-align: center
				font-size: 0.38rem
</style>