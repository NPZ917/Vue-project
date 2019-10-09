<template>
	<div class="page-wrapper">
		<div class="header">
			<a @click="$router.back()" class="iconfont icon-back"></a>
			<router-link to="/home" class="iconfont icon-home"></router-link>
		</div>
		<div class="content">
			<div class="banner" ref="banner">
				<ul v-if="bannerImgs.length > 0" :style="{ width:( bannerImgs.length + 2 ) + '00%' }">
					<li><img :src="bannerImgs[bannerImgs.length - 1]" alt=""></li>
					<li v-for="(item, i) in bannerImgs" :key="i">
						<img :src="item" alt="">
					</li>
					<li><img :src="bannerImgs[0]" alt=""></li>
				</ul>
				<span class="indicator">{{ bannerIndex }}/{{ bannerImgs.length }}</span>
			</div>
			<h1 class="name" v-text="model.name"></h1>
			<div class='num'>
				<span class='price'> 天猫价 <i>￥ {{ model.price }}</i></span>
				<span class='sale'>已售<i  v-text="model.sale"></i>万件</span>
			</div>
		</div>
		<div class="footer">
			<router-link to="/cart" class='cart'>
				<i class="iconfont icon-cart"></i>
				<span>购物车</span>
				<em class="shopping-count" v-if="cartCount > 0" v-text="cartCount"></em>
			</router-link>
			<button class="btn-popup" @click="isShopping = true">加入购物车</button>
		</div>
		<Popup :is-show=isShopping @close="isShopping = false">
			<div class="shopping-dialog">
				<div class='shopping-dialog-header'>
					<img class='avatar' :src="model.avatar" alt="" />
					<em class='price'>￥ {{ model.price }}</em>
				</div>
				<div class="shopping-dialog-content">
					<span class="title">数量</span>
					<div class="count-wrapper">
						<Count :count="count" :increase="() => count = count +1" :decrease="()=>count = count - 1"></Count>
					</div>
				</div>
				<div class="shopping-dialog-footer">
					<button class='btn-add-cart' @click="buy">确认</button>
				</div>
			</div>
		</Popup>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapActions } from 'vuex';
	import imagesLoaded from 'imagesloaded';
	import IScroll from 'iscroll';
	import API from '../../util/api.js';
	import Popup from '../../components/Popup';
	import Count from '../../components/Count';

	export default {
		components: { Popup, Count },
		data() {
		        return {
		                id: 0,
			        model: {},
			        bannerIndex: false,
			        isShopping: false,
			        count: 1,
			        cartCount: 0                    //购物车中的总财物数量
		        }
		},
		computed: {
		        bannerImgs() {
		                return this.model.bannerImgs ? this.model.bannerImgs.split(',') : [];
		        }
		},
		watch: {
		        id(newValue) { this.getItem(newValue).then(data => this.model = data); },
			bannerImgs(newValue) {
		                if(newValue.length === 0) return;
		                this._initBannerScroll();
			}
		},
		methods: {
			...mapActions('product', ['getItem']),
                        _initBannerScroll() {
                                this.$nextTick(() => {                                                                           //保证banner对应的html元素更新完毕
                                        imagesLoaded(this.$refs.banner,() => {                                        //保证iscroll区域所有图片加载完毕
                                                this.$nextTick(() => {                                                           //保证iscroll区域的所有样式渲染完毕
                                                        this.bannerScroll = new IScroll(this.$refs.banner, {
                                                                scrollY: false,         //关闭纵向滚动
                                                                scrollX: true,          //开启横向滚动
                                                                momentum: false,        //关闭惯性滚动
                                                                snap: true              //开启轮播图模式滚动
                                                        });
                                                        this.bannerScroll.on('scrollStart',() => {clearTimeout(this.timer);});   //停止自动播放
                                                        this.bannerScroll.on('scrollEnd',() => {                                            //调整整个滚动的位置，以实现无缝滚动
                                                                let len = this.bannerImgs.length + 2;
                                                                if(this.bannerScroll.currentPage.pageX === 0) {
                                                                        this.bannerScroll.disable();                                            //调整期间，不允许滚动
                                                                        setTimeout(() => {
                                                                                this.bannerScroll.goToPage(len - 2, 0, 0);
                                                                                this.bannerScroll.enable();                                     //恢复滚动
                                                                        },10);
                                                                }
                                                                if(this.bannerScroll.currentPage.pageX === len - 1) {
                                                                        this.bannerScroll.disable();
                                                                        setTimeout(() =>{
                                                                                this.bannerScroll.goToPage(1,0,0);
                                                                                this.bannerScroll.enable();
                                                                        },10);
                                                                }
                                                                let curPage = this.bannerScroll.currentPage.pageX;
                                                                if(curPage === 0) this.bannerIndex = len - 2;
                                                                else if(curPage === len - 1) this.bannerIndex = 1;
                                                                else this.bannerIndex = curPage;
                                                                this.timer = setTimeout(() => this.bannerScroll.next(), 3000);                         //再次开启自动播放
                                                        });
                                                        this.bannerScroll.goToPage(1,0,0);                                                                         //初始化显示第二页（第一张图片）
                                                        this.bannerIndex = 1;                                                                                            //记录更新当前是第几张
                                                        this.timer = setTimeout(() => this.bannerScroll.next(), 3000);                                //开始自动播放
                                                })
                                        })
                                });
                        },
                        _updateCartCount() {
                                if(sessionStorage.getItem('token'))
                                        API.cart.getCartCount().then(data => {this.cartCount =data});
                                else this.cartCount = 0;
                        },
                        buy() {
			        API.cart.addProduct(this.id, this.count).then(() => {
			              this.count = 1;
			              this.isShopping = false;
			              this.cartCount = this.cartCount + this.count;
			              this.$notice('成功加入购物车,快去购物车结算吧..');
			        });
                        }
		},
		created() {
		        this.id = parseInt(this.$route.params.id);
		        this._updateCartCount();
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
	.shopping-dialog
		display: flex
		flex-direction: column
		width: 100%
		box-sizing: border-box
		margin: 0.6rem 0 0.01rem
		.shopping-dialog-header
			display: flex
			align-items: center
			padding: 0.3rem
			img
				width: 1.8rem
				height: 1.8rem
				background-color: #eee
			em.price
				font-style: normal
				color: rgb(191, 17, 17)
				font-size: 0.4rem
				line-height: 1.8rem
				margin-left: 0.2rem
		.shopping-dialog-content
			border-top: 1px solid #ccc
			flex-grow: 1
			padding: 0.3rem 0.3rem 4rem
			span.title
				font-size: 0.3rem
				margin-top: 0.2rem
			.count-wrapper
				font-size: 0.3rem
				margin: 0.4rem 0
		.shopping-dialog-footer
			height: 1rem
			text-align: center
			.btn-add-cart
				font-size: 0.33rem
				color: #fff
				border-radius: 0.4rem
				width: 90%
				height: 0.84rem
				background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
				outline: none
				border: none
	.header
		position: fixed
		left: 0
		top: 0
		z-index: 100
		height: 0.9rem
		display: flex
		justify-content: space-between
		align-items: center
		width: 100%
		padding: 0 0.2rem
		box-sizing: border-box
		a
			width: 0.6rem
			height: 0.6rem
			line-height: 0.6rem
			text-align: center
			border-radius: 50%
			color: #FFFFFF
			background: rgba(0, 0, 0, 0.3)
			font-size: 0.36rem
	.content
		padding-bottom: 1.1rem
		.banner
			overflow: hidden
			padding: 0
			margin-bottom: 0.3rem
			touch-action: pan-x
			position: relative
			ul
				display: flex
				li
					flex-grow: 1
					font-size: 0
					img
						width: 100%
		.name
			font-size: 0.35rem
			font-weight: 400
			padding: 0.3rem
		.num
			display: flex
			justify-content: space-between
			padding: 0.3rem
			.price
				color: #fc4d52
				font-size: 0.25rem
				i
					font-style: normal
					font-size: 0.35rem
			.sale
				color: #AAAAAA
				font-size: 0.25rem
				i
					font-style: normal
					color: #fc4d52
					font-size: 0.35rem
		span.indicator
			position:absolute
			right: 0.3rem
			bottom: 0.3rem
			color: white
			background-color: rgba(0,0,0,0.3)
			padding: 0 0.14rem
			border-radius: 0.2rem
			height:0.4rem
			line-height: 0.4rem
	.footer
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
		width: 100%
		height: 1.1rem
		box-sizing: border-box
		border-top: 1px solid #ccc
		background-color: transparent
		padding: 0 0.3rem
		position:fixed
		bottom: 0
		left: 0
		a.cart
			display: flex
			flex-direction: column
			align-items: center
			position: relative
			color: #7a7a7a
			i
				font-size: 0.44rem
			em
				font-style: normal
				background-color: red
				color: white
				position: absolute
				top: 0
				right: 0
				transform: translate(30%, -20%)
				padding: 0 0.08rem
				border-radius: 50%
				display: none
		button.btn-popup
			width: 2.6rem
			height: 0.78rem
			background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
			color: white
			font-size: 0.28rem
			outline: none
			border:none
			border-radius: 0.3rem

</style>