<template>
	<div class="page-wrapper">
		<div class="header">
			<a class='iconfont icon-back back' @click="$router.back();"></a>
			<h1>登录</h1>
			<a></a>
		</div>
		<div class="main">
			<LoginPwd v-if="mode"></LoginPwd>
			<LoginPhone v-else></LoginPhone>
			<a v-text="mode ? '手机登录' : '用户名密码登录'" @click="mode = !mode"></a>
			<router-link to="/register" class="register">立即注册</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginPwd from './LoginPwd.vue';
	import LoginPhone from './LoginPhone.vue';

	export default{
	        components: { LoginPwd, LoginPhone },
		data() {
	                return {
	                        mode: true,                             //真表示手机登录,假表示密码登录
	                };
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	a
		font-size: 0.28rem
	.page-wrapper
		width: 100%
		height: 100%
		.header
			display: flex
			background: linear-gradient(to left, #fbaa58 0, #fa4dbe 100%)
			color: #fff
			a
				width: 0.9rem
				color: #fff
				text-align: center
				font-size: 0.45rem
				line-height: 0.9rem
			h1
				flex-grow: 1
				text-align: center
				line-height: 0.9rem
				font-weight: normal
				font-size: 0.35rem
		.main
			padding: 1.4rem 0.9rem 0
			a.register
				float: right
</style>