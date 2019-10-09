<template>
	<div class="page-wrapper">
		<div class="page">
			<div class='info'>
				<div class='user-avatar'>
					<a href="#">
						<img src="./images/user.png" alt="">
					</a>
				</div>
				<div class="account" v-if="account">
					<span class="name" v-text="account"></span>
				</div>
				<div class='user-type' v-else>
					<router-link to="/login">登录</router-link>
					/
					<router-link to="register">注册</router-link>
				</div>

			</div>
			<div class='main'>
				<div class='user-me'>
					<ul>
						<li>
							<router-link to="/order">
								<img src="./images/list.png" alt="">
								<span>我的订单</span>
							</router-link>
						</li>
						<li>
							<a>
								<img src="./images/love.png" alt="">
								<span>我的收藏</span>
							</a>
						</li>
						<li>
							<router-link to="/address">
								<img src="./images/foot.png" alt="">
								<span>我的地址</span>
							</router-link>
						</li>
					</ul>
				</div>
				<div class='tools'>
					<p>常用工具</p>
					<ul>
						<li>
							<a>
								<img src="./images/tools1.png" alt="">
								<span>领券帮助</span>
							</a>
						</li>
						<li>
							<a>
								<img src="./images/tools2.png" alt="">
								<span>专属客服</span>
							</a>
						</li>
						<li>
							<a @click="clear">
								<img src="./images/tools3.png" alt="">
								<span>退出登录</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class='footer'>
				<Nav/>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import Nav from '../../components/Nav';
        let account = sessionStorage.getItem('name');
        export default {
                components: { Nav },
	        data() {
                        return {
                                account,
                        }
	        },
	        methods: {
                        clear() {
                                sessionStorage.clear();
                                location.reload();
                        }
	        },
	        watch: {
                        account(newValue) {
                                this.$router.push('/profile');
                        }
	        }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		background-color: #f5f5f5
		width: 100%
		height: 100%
		.page
			width: 100%
			height: 100%
			background: url(images/profile_bg.png) no-repeat
			background-size: 100% 3.5rem
			.info
				display: flex
				padding: 0.4rem
				.user-type
					display: flex
					justify-content: center
					align-items: center
					padding-left: 0.3rem
					font-size: 0.4rem
					color: #ffffff
					a
						color: #ffffff
				.account
					display: flex
					justify-content: center
					align-items: center
					padding-left: 0.3rem
					font-size: 0.4rem
					color: #ffffff
					button
						width: 1rem
						height: 1rem
			.main
				.user-me
					margin: 0 0.3rem
					height: 2rem
					background: #fff
					border-radius: 0.3rem
					ul
						display: flex
						height: 100%
						li
							width: 33.33%
							height: 100%
							a
								height: 100%
								display: flex
								flex-direction: column
								justify-content: center
								align-items: center
								color: #000
				.tools
					margin: 0.3rem 0.3rem
					background: #fff
					border-radius: 0.15rem
					p
						border-bottom: 1px solid #EEE
						line-height: 0.7rem
						padding-left: 0.3rem
						box-sizing: border-box
						font-size: 0.3rem
						font-family: PingFangSC-Medium
						font-weight: 500
						color: #333
					ul
						display: flex
						padding: 0.4rem 0
						li
							width: 33.33%
							height: 100%
							a
								height: 100%
								display: flex
								flex-direction: column
								justify-content: center
								align-items: center
								color: #000
			.footer
				flex-shrink: 0
				width: 100%
				height: 1rem
				border-top: 1px solid #b0b0b0
				position: fixed
				bottom: 0
				left: 0
</style>