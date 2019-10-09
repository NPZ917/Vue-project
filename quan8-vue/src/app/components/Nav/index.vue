<template>
		<ul class="nav">
			<li>
				<router-link to="/home">
					<i></i>
					<span>首页</span>
				</router-link>
			</li>
			<li>
				<router-link to="/ship">
					<i></i>
					<span>9.9包邮</span>
				</router-link>
			</li>
			<li>
				<router-link to="/category">
					<i></i>
					<span>分类</span>
				</router-link>
			</li>
			<li>
				<router-link to="/cart">
					<i></i>
					<span>购物车</span>
				</router-link>
			</li>
			<li>
				<router-link to="/profile">
					<i></i>
					<span>个人</span>
				</router-link>
			</li>
		</ul>
</template>

<script type="text/ecmascript-6">
	export default {

	};
</script>

<style lang="stylus" rel="'stylesheet/stylus" scoped>
	ul.nav
		height: 1rem
		display: flex
		li
			display: flex
			width: 20%
			a
				width: 100%
				display: flex
				flex-direction: column
				justify-content: center
				align-items: center
			&:nth-child(1)>a>i
				width: 0.48rem
				height: 0.48rem
				background-image: url(images/1.png)
				background-size: 100% 100%
			&:nth-child(2)>a>i
				width: 0.48rem
				height: 0.48rem
				background-image: url(images/2.png)
				background-size: 100% 100%
			&:nth-child(3)>a>i
				width: 0.48rem
				height: 0.48rem
				background-image: url(images/3.png)
				background-size: 100% 100%
			&:nth-child(4)>a>i
				width: 0.48rem
				height: 0.48rem
				background-image: url(images/4.png)
				background-size: 100% 100%
			&:nth-child(5)>a>i
				width: 0.48rem
				height: 0.48rem
				background-image: url(images/5.png)
				background-size: 100% 100%
			&:nth-child(1)>a.router-link-active>i
				background-image: url(images/6.png)
			&:nth-child(2)>a.router-link-active>i
				background-image: url(images/7.png)
			&:nth-child(3)>a.router-link-active>i
				background-image: url(images/8.png)
			&:nth-child(4)>a.router-link-active>i
				background-image: url(images/9.png)
			&:nth-child(5)>a.router-link-active>i
				background-image: url(images/10.png)
</style>