<template>
	<div class="page-wrapper">
		<div class="header">
			<h1>订单确认</h1>
			<router-link to="/home" replace class="iconfont icon-home" ></router-link>
		</div>
		<div class="content">
			<h3>配送地址</h3>
			<div class="receive-address" @click="$router.push({ path: '/address', query: {referer: '/orderconfirm'} })">
				<p v-if="addressId ===0">暂无可以地址，请添加...</p>
				<template v-else>
					<span class="receive-name" v-text="address.receiveName"></span>
					<span class="receive-tel" v-text="address.receiveTel"></span>
					<span class="receive-addresss">{{ address.receiveAddress }} {{ address.receiveAddressDetail }}</span>
				</template>
				<i>&gt;</i>
			</div>
			<h3>订单详情</h3>
			<ul class='buy-list'>
				<li v-for="item in buyList" :key="item.id">
					<div class='avatar-wrapper'>
						<img :src="item.avatar"/>
					</div>
					<div class="product-info">
						<div  class='name-wrapper'>
							<h3 v-text="item.name"></h3>
						</div>
						<div class='product-info-footer'>
							<span class='price' v-text="`￥ ${ item.price }`"></span>
							<span class="count">x {{ item.count }}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer">
			<span>￥ {{ account }}</span>
			<button @click="generateOrder">订单确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex';

        export default {
                data() {
                        return {
                                addressId: 0
                        };
                },
	        computed: {
		        ...mapState('cart', [ 'list' ]),
		        // 筛选出select1= true的列表
		        buyList() {
		                return this.list.filter(item => item.select1)
		        },
		        account() {
		                return this.buyList.reduce((sum, item) => sum + item.price * item.count, 0);
		        },
		        address() {
		                return this.$store.state.address.list.find(item => item.id === this.addressId);
		        }
	        },
	        methods: {
                        ...mapActions('cart',['settlement']),
		        ...mapActions('address', [ 'init' ]),
                        generateOrder() {
                                if(this.addressId ===0 )  this.$alert("必须提供一个送货地址");
                                else this.settlement(this.addressId).then(()=> {
                                        this.$router.replace('/payment');
                                });
                        }

	        },
	        created() {
                        if(this.$route.query.addressId) this.addressId = parseInt(this.$route.query.addressId);
                        else this.init().then(() => {
                                let defaultAddress = this.$store.state.address.list.find(item => item.isDefault);
                                this.addressId = defaultAddress ? defaultAddress.id : 0;
                        })
	        },
	        beforeRouteEnter(to, from, next) {
                        if(from.path === '/cart') next();
                        else if(from.path === '/address' && to.query.addressId) next();
                        else next('/home')
	        }
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
			height: 0.9rem
			background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%)
			color: #fff
			position: relative
			h1
				text-align: center
				font-size: 0.34rem
				font-weight: normal
				height: 0.9rem
				line-height: 0.9rem
			a
				width: 0.9rem
				height: 0.9rem
				text-align: center
				line-height: 0.9rem
				position: absolute
				top: 0
				right: 0
				font-size: 0.5rem
				color: #fff
		.footer
			flex-shrink: 0
			height: 1rem
			display: flex
			justify-content: space-between
			align-items: center
			padding: 0 0.2rem
			span
				color: #bf1111
				font-size: 0.32rem
			button
				height: 0.7rem
				border-radius: 0.3rem
				font-size: 0.3rem
				padding: 0 0.4rem
				background-color: #bf1111
				color: #fff
				border: none
				outline: none
		.content
			flex-grow: 1
			border-top: 1px solid #b0b0b0
			border-bottom: 1px solid #b0b0b0
			overflow: auto
			background-color: #f3f3f3
			padding: 0.2rem
			h3
				font-weight: 400
				font-size: 0.3rem
				margin-bottom: 0.2rem
				padding: 0.1rem 0.2rem
			.receive-address
				padding: 0.2rem 0.2rem
				height: 1.2rem
				background-color: #eee
				position: relative
				span
					display: block
					margin-bottom: 0.1rem
					color: #666
				i
					position: absolute
					top: 40%
					right: 0.5rem
					font-size: 0.35rem
			ul.buy-list
				display: flex
				flex-direction: column
				li
					width: 100%
					height: 2.5rem
					background-color: white
					border-radius: 0.2rem
					display: flex
					align-items: center
					margin-bottom: 0.2rem
					.avatar-wrapper
						margin-left: 0.2rem
					img
						width: 1.9rem
						background-color: #eee
					.product-info
						display: flex
						flex-direction: column
						justify-content: space-around
						flex-grow: 1
						box-sizing: border-box
						margin-left: 0.2rem
						h3
							font-style: normal
							font-weight: 500
							font-size: 0.3rem
							padding: 0 0.2rem 0 0
						.product-info-footer
							display:flex;
							justify-content: space-between;
							margin-top: 0.45rem
							padding-right: 0.4rem
							span.price
								font-size: 0.28rem;
								color: red
							span.count
								color: black
								font-size: 0.34rem
</style>