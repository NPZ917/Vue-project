<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back()">
				<i class="iconfont icon-back"></i>
			</a>
			<h1>我的订单</h1>
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
			</router-link>
		</div>
		<div class="title">
			<ul>
				<li v-for="(item, i) in title" :key="i" @click="getItem(i)">
					<span v-text="item" :class="{ active: activeId === i }"></span>
				</li>
			</ul>
		</div>
		<div class="main">
			<ul v-show="page === 0">
				<li v-for="(item,i) in orderList" :key="i">
					<div class="top"><div class="order">订单号：<span v-text="item.orderid"></span></div></div>
					<div class="center">
						<img :src="item.avatar" alt="">
						<div class="double">
							<h3>{{ item.name }}</h3>
							<div class="des">
								<span>单价：￥{{item.price}}</span>
								<span>总数量：X{{ item.shopCount }}</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<ul v-show="page === 1">
				<li>暂无此类信息</li>
			</ul>
			<ul v-show="page === 2">
				<li v-for="(item,i) in orderList" :key="i">
					<div class="top"><div class="order">订单号：<span v-text="item.orderid"></span></div></div>
					<div class="center">
						<img :src="item.avatar" alt="">
						<div class="double">
							<h3>{{ item.name }}</h3>
							<div class="des">
								<span>单价：￥{{item.price}}</span>
								<span>总数量：X{{ item.shopCount }}</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<ul v-show="page === 3">
				<li>暂无此类信息</li>
			</ul>
			<ul v-show="page === 4">
				<li>暂无此类信息</li>
			</ul>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
        import API from '../../util/api.js';
        export default {
                data() {
                        return {
                                title:['全部', '待付款', '待发货', '待收货', '待评价'],
                                orderList:[],
                                Token:'',
                                activeId: 0,
                                page: 0,
                        }
                },
                methods:{
                        getItem(index) {
                                this.activeId = index;
                                this.page = this.activeId;
                        },
                },
                created() {
                        return API.order.orderDetail().then(data => this.orderList = data)
                },
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
		.title
			flex-shrink: 0
			ul
				text-align:center
				display:flex
				padding:0.2rem
				font-size: 0.28rem
				li
					flex-grow:1
					span
						padding:0.1rem 0
						border-bottom:2px solid transparent
					span.active
						color:#B4282D
						border-color:#B4282D
		.main
			flex-grow: 1
			padding: 0.2rem 0.2rem 0.8rem 0.2rem
			overflow: auto
			ul
				li
					border: 1px solid #b0b0b0
					border-radius: 0.2rem
					margin-top: 0.2rem
					.top
						padding: 0.1rem 0.2rem
						border-bottom: 1px solid #b0b0b0
					.center
						display: flex
						padding-left: 0.1rem
						img
							width: 2.5rem
						.double
							display: flex
							flex-direction: column
							justify-content: space-between
							h3
								font-weight: normal
								margin-top: 0.4rem
								padding: 0 0.2rem
							.des
								margin-bottom: 0.3rem
								display: flex
								justify-content: space-between
								padding: 0 0.2rem
								font-size: 0.28rem

</style>