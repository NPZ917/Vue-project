<template>
	<div class="page-wrapper">
		<!--<Popup :is-show="isFilter" align="top" @close="isFilter = false">-->
			<!--<div class="filter-dialog">-->
				<!--<div class="header">-->
					<!--<span :class="{ active: orderCol === 'price' } " @click="toggleOrder('price')">价格<i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir==='DESC' }"></i></span>-->
					<!--<span :class="{ active: orderCol === 'sale' } " @click="toggleOrder('sale')">销量<i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir==='DESC' }"></i></span>-->
					<!--<input type="text" placeholder="请输入商品名称" v-model="name"/>-->
					<!--<i class="iconfont icon-search" @click="search"></i>-->
				<!--</div>-->
			<!--</div>-->
		<!--</Popup>-->
		<router-link to="/home" class="iconfont icon-home"></router-link>
		<a class="iconfont icon-top" @click="toTop" v-show="showRocket"></a>
		<div class="header">
			<router-link to="/category">
				<i class="iconfont icon-back"></i>
			</router-link>
			<h1 v-text="title"></h1>
			<a @click="isFilter = true">
				<i class="iconfont icon-sort"></i>
			</a>
		</div>
		<div class="sub-list">
			<ul>
				<li v-for="item in subList">
					<router-link :to="`/list/${ mId }/${ item.id }`" v-text="item.name"></router-link>
				</li>
			</ul>
		</div>
		<div class="content" ref="scroll">
			<div class="content-wrapper">
				<ul class="clearfix">
					<li v-for="item in productList" :key="item.id">
						<router-link :to="`/detail/${ item.id }`">
							<img :src="item.avatar" :alt="item.name">
							<div class="cent">
								<h3 class="ellipsis" v-text="item.name"></h3>
								<div class="consult">
									<span class="price"> 天猫价￥ <i>{{ item.price }}</i></span>
									<span class="sale">已售<i>{{ item.sale }}</i>万件</span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="info">
					<i v-if="isLoading" class="loading"></i>
					<i v-else-if="(!hasMore) && productList.length>0" class="iconfont icon-bottom"></i>
					<i v-else-if="(!hasMore) && productList.length ===0"></i>
					<i v-else class="iconfont icon-up-double"></i>
					<p v-text="tipText"></p>
				</div>

			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import IScroll from 'iscroll/build/iscroll-probe';
        import  imagesLoaded from 'imagesloaded';
        import Popup from '../../components/Popup';
        import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

        export default {
                components: { Popup },
                data: function() {
                        return {
                                mId: 0,
                                sId: 0,
                                count: 4,                                       //每页几条商品数据
                                showRocket: false,                       //是否显示返回顶部
                                name: '',                                       //用户输入的搜索名字（默认不筛）
                                orderCol: 'price',                         //排序的列名（默认是价格）
                                orderDir: 'DESC',                         //排序方向（默认降序）
                                isLoading: false,                          //是否正在请求商品数据
                                hasMore: true,                            //是否还有更多的商品可供加载
                                isTriggerLoadMore: false,          //标识是否触发了加载更多
	                        isFilter: false
                        };
                },
                computed: {
                        ...mapState('category', { categoryList: 'list' }),
                        ...mapState('product', { productList: 'list' }),
                        ...mapGetters('category', ['subList']),
                        title: function(){
                                let target = this.categoryList.find(item => item.id === this.mId);
                                return target ? target.name: '';
                        },
                        tipText() {
                                if(this.isLoading) return '加载中..';
                                if(!this.hasMore) return this.productList.length > 0 ?  '已到达底部..' : '暂无相关商品,敬请期待..';
                                return '上拉加载..';
                        }
                },
                methods: {
                        ...mapActions('category', ['init', 'toggleId']),
                        ...mapActions('product', [ 'getData' ]),
                        _getAjaxParams(loadMore) {
                                return {
                                        cid: this.sId,
                                        name: this.name,
                                        start: loadMore ? this.productList.length : 0,
                                        count: this.count,
                                        orderCol: this.orderCol,
                                        orderDir: this.orderDir
                                };
                        },
                        _getProductData(loadMore = false) {
                                if(!loadMore) this.showRocket = false;                //每次请求数据（不是加载更多），都要把返回顶部隐藏
                                this.isLoading = true;
                                //setTimeout(() => {
                                this.getData(this._getAjaxParams(loadMore))                              //通知仓库请求商品数据
                                        .then(length => {
                                                this.isLoading = false;
                                                this.hasMore = length === this.count ? true : false;
                                        });
                                //}, 1000)
                        },
                        //创建更新滚动对象
                        _initOrRefreshScroll() {
                                imagesLoaded(this.$refs.scroll, () => {
                                        this.$nextTick(() => {
                                                if(this.scroll) this.scroll.refresh();
                                                else {
                                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                                click: true,
                                                                bounce: false,                      //关闭边界回弹，因为惯性滚动会触发边界回弹影响用户体验
                                                                deceleration: 0.003,            //滚动阻尼系数，值越大惯性滚动越大，惯性滚的距离越短（值小于0.01，默认0.0006）
                                                                probeType: 3                      //不管是触摸滚动还是触摸导致的惯性滚动都出发scroll事件
                                                        });
                                                        this.scroll.on('scroll', () => {
//                                                                console.log(this.scroll.maxScrollY, this.scroll.y);
                                                                if(this.hasMore && (!this.isLoading) && !this.isTriggerLoadMore)
                                                                        this.isTriggerLoadMore = this.scroll.y < 0 && this.scroll.maxScrollY === this.scroll.y;
//					                        if(this.scroll.y < 0 && this.scroll.maxScrollY - this.scroll.y >50) this.isTriggerLoadMore = true;
//					                        else this.isTriggerLoadMore = false;
                                                        });
                                                        this.scroll.on('scrollEnd', () => {
                                                                if(this.scroll.y === 0) this.showRocket = false;
                                                                if(this.scroll.y < 0 && !this.showRocket) this.showRocket = true;
                                                                if(this.isTriggerLoadMore) {
                                                                        this.isTriggerLoadMore = false;
                                                                        this._getProductData(true);
                                                                }
                                                        });
                                                }
                                        });
                                });
                        },
                        toTop() { this.scroll.scrollTo(0,0, 300); }
                },
                watch: {
                        sId: function(newValue, oldValue) {
                                //请求商品列表数据
                                this.hasMore = true;
                                this._getProductData(false);
                        },
                        productList: function(newValue, oldValue) {
                                this.$nextTick(() => this._initOrRefreshScroll());
                        }
                },
                created: function() {
                        console.log('创建');
                        //应对用户直接访问商品列表页面或在当前页面点击刷新的情况
                        this.init().then(() => this.toggleId(parseInt(this.$route.params.mId)));
                },
                //第一次进入组件或每次从没激活导师就会被调用
                activated: function() {
                        console.log('activated 调用');
                        this.mId = parseInt(this.$route.params.mId);
                        this.sId = parseInt(this.$route.params.sId);
                },
                //路由变化时的生命周期钩子函数（路由守卫）
                beforeRouteUpdate: function(to, from, next) {
                        console.log('路由已激活，但路由携带的参数在发生改变');
                        if(to.params.sId !== from.params.sId) { 			//自己判断变没变
                                if(this.isLoading) {
                                        alert('您的操作太频繁了..');
                                        return;
                                }
                                this.sId = parseInt(to.params.sId);
                                next();
                        }
                },
                //update函数是一个可以被反复频繁触发的函数，一定要进行合理的使用
                updated: function() {      //函数调用时可以确保组件template中的dom更新完毕

                },
                //组件激活到不激活时调用
                deactivated: function() {
                        console.log('deactivated 调用');
                },
                destroyed: function() {
                        if(this.scroll) this.scroll.destroy()     //销毁滚动对象
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		a.icon-home,a.icon-top
			position: fixed
			right:0.2rem
			z-index: 100
			box-sizing: border-box
			width: 0.84rem
			height: 0.84rem
			text-align: center
			line-height:0.84rem
			font-size: 0.44rem
			border-radius: 50%
			font-weight: blod
		a.icon-home
			bottom: 0.2rem
			background-color: rgba(0,0,0,0.3)
			color: #fff
		a.icon-top
			bottom:1.24rem
			border: 1px solid #b0b0b0
			background-color: rgba(0,0,0,0.3)
			color: #fff
		.header
			flex-shrink: 0
			height: 1rem
			display: flex
			border-bottom: 1px solid #ccc
			background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
			color: #fff
			a
				flex-shrink: 0
				width: 1rem;
				height: 1rem
				text-align: center
				line-height: 1rem
				i
					font-size: 0.42rem
					color: #fff
			h1
				flex-grow: 1
				text-align: center
				line-height: 1rem
				font-weight: normal
				font-size: 0.39rem
		.sub-list
			flex-shrink: 0
			height: 0.9rem
			ul
				display: flex
				overflow: auto
				height: 100%
				border-bottom: 1px solid #ccc
				background-color: #eee;
				li
					flex-shrink:0
					padding:0 0.3rem
					line-height: 0.9rem
					font-size: 0.27rem
					height: 100%
					a
						box-sizing: border-box
						display: block
						width: 100%
						height: 100%
						border-bottom: 3px solid transparent
						-webkit-tap-highlight-color:transparent
						&.router-link-active
							border-bottom-color: red
		.content
			flex-grow: 1
			overflow: hidden
			touch-action: pan-y
			.content-wrapper
				overflow: hidden
				ul
					li
						padding: 0.22rem
						box-sizing: border-box
						margin-bottom: 0.22rem
						border-bottom: 1px solid #b0b0b0
						a
							display: flex
							width: 100%
							height: 100%
							background-color: #FFFFFF
							img
								flex-shrink: 0
								width: 2.5rem
							.cent
								flex-grow: 1
								display: flex
								flex-direction: column
								justify-content: space-between
								h3
									color: #333333
									font-size: 0.28rem
									font-weight: normal
									padding-left: 0.2rem
									max-width: 4rem
								.consult
									display: flex
									justify-content: space-between
									padding: 0.4rem
									.price
										color: #fc4d52
										font-size: 0.25rem
										i
											font-style: normal
											font-size: 0.35rem
									.sale
										color: #aaa
										font-size: 0.25rem
										i
											font-style: normal
											color: #fc4d52
											font-size: 0.35rem
				.info
					height: 1rem
					display: flex
					justify-content: center
					align-items: center
					color: #666
					i
						font-size: 0.24rem
						margin-right: 0.1rem
						&.loading
							background-image: url(./loading.gif)
							width: 0.3rem
							height: 0.3rem
							background-position: center center
							background-size: 130% 130%
</style>