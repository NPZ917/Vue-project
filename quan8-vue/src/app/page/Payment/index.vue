<template>
	<div class="page-wrapper">
		<div class="header">
			<router-link to="/home">
				<i class="iconfont icon-back"></i>
			</router-link>
			<h1>支付成功</h1>
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
			</router-link>
		</div>
		<div class="content">
			<img src="./true.jpg" alt="">
			<h3>支付成功</h3>
		</div>
		<div class="footer">
			<router-link class="order" to="/order">查看订单</router-link>
			<router-link class="home" to="/home">返回首页</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		background-color: #f5f5f5
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		.header
			flex-shrink: 0
			height: 0.8rem
			display: flex
			border-bottom: 1px solid #ccc
			background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
			color: #fff
			a
				flex-shrink: 0
				width: 1rem;
				height: 0.8rem
				text-align: center
				line-height: 0.8rem
				i
					font-size: 0.42rem
					color: #fff
			h1
				flex-grow: 1
				text-align: center
				line-height: 0.8rem
				font-weight: normal
				font-size: 0.39rem
		.content
			text-align: center
			padding-top: 2rem
			flex-grow: 1
			img
				width: 2rem
			h3
				font-size: 0.4rem
				padding-top: 0.4rem
		.footer
			flex-shink: 0
			padding-bottom: 1rem
			a.order
				display: block
				width: 5rem
				height: 1rem
				text-align: center
				line-height: 1rem;
				border: 1px solid #b0b0b0
				border-radius: 0.6rem;
				outline: none;
				color: #000
				margin: 0.3rem auto
				font-size: 0.34rem
			a.home
				display: block
				width: 5rem
				height: 1rem
				text-align: center
				line-height: 1rem;
				color: #fff;
				background: linear-gradient(to left, #fbaa58 0, #fa4dbe 100%);
				border-radius: 0.6rem;
				outline: none;
				margin: 0 auto
				font-size: 0.34rem

</style>