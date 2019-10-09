<template>
	<div class="page-wrapper">
		<div class="header">
			<router-link to="/home">
				<i class="iconfont icon-back"></i>
			</router-link>
			<h1>9.9  包邮</h1>
			<router-link to="/home">
				<i class="iconfont icon-sort"></i>
			</router-link>
		</div>
		<div class="content">
			<div class="aside">
				<ul>
					<li class="col2">
						<a>
							<h3 class="list1">9块9每日精选</h3>
							<p>十元封顶</p>
							<img src="./images/1.jpg" alt="">
						</a>
					</li>
					<li class="col1">
						<a>
							<h3 class="list2">3.9元区</h3>
							<p>居家用品</p>
							<img src="./images/2.jpg" alt="">
						</a>
					</li>
					<li class="col1">
						<a>
							<h3 class="list3">5.9元区</h3>
							<p>数码小件</p>
							<img src="./images/3.png" alt="">
						</a>
					</li>
				</ul>
				<ul>
					<li class="col2">
						<a>
							<h3 class="list4">19.9专区</h3>
							<p>半价抢不停</p>
							<img src="./images/4.jpg" alt="">
						</a>
					</li>
					<li class="col1">
						<a>
							<h3 class="list5">7.9元区</h3>
							<p>仙女配饰</p>
							<img src="./images/5.png" alt="">
						</a>
					</li>
					<li class="col1">
						<a>
							<h3 class="list6">新品专区</h3>
							<p>潮流箱包</p>
							<img src="./images/6.png" alt="">
						</a>
					</li>
				</ul>
			</div>
			<div class="banner">
				<ul>
					<li><a class="active">精选</a></li>
					<li><a>美食</a></li>
					<li><a>服装</a></li>
					<li><a>配饰</a></li>
					<li><a>内衣</a></li>
					<li><a>母婴</a></li>
					<li><a >箱包</a></li>
					<li><a>文娱</a></li>
					<li><a>数码</a></li>
				</ul>
			</div>
			<div class="product">
				<h2>精选推荐</h2>
				<ul>
					<li>
						<a>
							<img src="./images/29.jpg" alt="">
							<p class="title">【拍3件】韩国可莱丝针剂水库面膜</p>
							<div class="group">
								<span class="label1">10元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>168</span></p>
							<div class="more">
								<p>天猫 ¥<span>178</span></p>
								<span>已售 <span>4万</span></span>
							</div>
						</a>
					</li>
					<li>
						<a>
							<img src="./images/30.jpg" alt="">
							<p class="title">【潮流ins风】秋季韩版牛仔裤破洞裤</p>
							<div class="group">
								<span class="label1">20元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>388</span></p>
							<div class="more">
								<p>天猫 ¥<span>390</span></p>
								<span>已售 <span>15万</span></span>
							</div>
						</a>
					</li>
					<li>
						<a>
							<img src="./images/31.jpg" alt="">
							<p class="title">第二件9.9，第三件9.9【良品铺子礼包</p>
							<div class="group">
								<span class="label1">5元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>90</span></p>
							<div class="more">
								<p>天猫 ¥<span>120</span></p>
								<span>已售 <span>52万</span></span>
							</div>
						</a>
					</li>
					<li>
						<a>
							<img src="./images/32.jpg" alt="">
							<p class="title">挂耳式无线运动蓝牙耳机5.0双耳</p>
							<div class="group">
								<span class="label1">30元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>555</span></p>
							<div class="more">
								<p>天猫 ¥<span>600</span></p>
								<span>已售 <span>3.2万</span></span>
							</div>
						</a>
					</li>
					<li>
						<a>
							<img src="./images/33.jpg" alt="">
							<p class="title">【闪格】网红速干吹风机 贼好用</p>
							<div class="group">
								<span class="label1">10元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>365</span></p>
							<div class="more">
								<p>天猫 ¥<span>380</span></p>
								<span>已售 <span>4.2万</span></span>
							</div>
						</a>
					</li>
					<li>
						<a>
							<img src="./images/34.jpg" alt="">
							<p class="title">【买一送一】多拍多送巧克力礼盒装</p>
							<div class="group">
								<span class="label1">10元券</span>
								<span class="label2">官方旗舰店</span>
							</div>
							<p class="price">券后  ¥ <span>200</span></p>
							<div class="more">
								<p>天猫 ¥<span>230</span></p>
								<span>已售 <span>10万</span></span>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<Nav/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Nav from '../../components/Nav';

	export default {
	        components: { Nav },
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
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
			flex-grow: 1
			overflow: auto
			background-color: rgb(246, 246, 246)
			.aside
				ul
					width: 100%
					display: flex
					li
						height: 1.8rem
						background-color: #fff
						border: 2px solid #f6f6f6
						a
							display: block
							width: 100%
							height: 100%
							position: relative
							h3
								position: absolute
								top: 0
								left: 0
								z-index: 10
								padding: 0.1rem
								font-weight: normal
								font-size: 0.3rem
							h3.list1
								color: #FC4073
							h3.list2
								color: #1889FF
							h3.list3
								color: #7250FD
							h3.list4
								color: #FC4302
							h3.list5
								color: #07C6B3
							h3.list6
								color: #FF3E90
							p
								position: absolute
								top: 0.4rem
								left: 0
								z-index: 10
								padding: 0.1rem
								color: #888
							img
								position: absolute
								bottom: 0
								right: 0
								width: 100%
								height: 100%
					li.col2
						flex-grow: 2
						width: 50%
					li.col1
						flex-grow: 1
						width: 25%

			.banner
				height: 1rem
				background-color: #fff
				border-bottom: 1px solid #f6f6f6
				margin-top: 0.2rem
				ul
					display: flex
					overflow: auto
					height: 100%
					li
						height: 100%
						a
							display: block
							width: 1rem
							height: 100%
							line-height: 1rem
							font-size: 0.28rem
							padding-left: 0.3rem
							&.active
								font-weight: 600
								border-bottom: 3px solid #FC3F78
			.product
				padding: 0 0.2rem 0.3rem
				h2
					margin: 0.4rem auto
					text-align center
					font-size: 0.3rem
					font-weight: normal
					color: #C043FC
					background: url("images/product.png") no-repeat center center
				ul
					width: 100%
					display: flex
					flex-wrap: wrap
					justify-content: space-between
					li
						margin-top: 0.2rem
						width: 48%
						background-color: #fff
						border-radius 0.15rem
						a
							img
								width: 100%
							p.title
								padding: 0.2rem
								font-size: 0.24rem
							.group
								padding: 0 0.2rem
								span.label1
									border: 0;
									background: linear-gradient(90deg,#ff8873 0,#ff4f4f 100%);
									color: #FFF;
									font-size: 0.2rem
									text-align: cneter
									border-radius: 0.03rem
									padding: 0 0.06rem
								span.label2
									border: .01rem solid #ff9793
									color: #ff9793
									padding: 0 0.06rem
									font-size: 0.2rem
									border-radius: 0.05rem
							p.price
								padding: 0.1rem 0.2rem
								color: #ff3b32
								span
									font-size: 0.34rem
							.more
								padding: 0 0.2rem 0.2rem
								display: flex
								justify-content: space-between
								color: #999
		.footer
			width: 100%
			height: 1rem
			flex-shrink: 0
			border-top: 1px solid #b0b0b0
</style>