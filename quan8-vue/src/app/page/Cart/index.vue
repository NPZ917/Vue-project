<template>
	<div class="page-wrapper">
		<div class="header">
			<a class='iconfont icon-back back' @click="$router.back();"></a>
			<h1 class="title">购物车</h1>
			<button class='btn-edit-toggle' :class="{ hide: list.length ===0 }" v-text="isEdit ? '完成' : '编辑' " @click="isEdit = !isEdit"></button>
		</div>
		<div class="cart-empty" v-if="list.length ===0">
			<img :src="emptyImage" alt="">
			<p>购物车还没有商品哦~</p>
			<router-link to="/home">去逛逛</router-link>
		</div>
		<template v-else>
			<div class="content">
				<ul class='cart-list'>
					<li v-for="item in list" :key="item.id">
						<i class="checkbox" :class="{ checked: item.select1}" v-show="!isEdit" @click="toggleSelect1(item.id)"></i>
						<i class= "checkbox" :class="{ checked: item.select2 }" v-show="isEdit" @click="toggleSelect2(item.id)"></i>
						<router-link :to="`/detail/${ item.pid }`" class='avatar-wrapper'>
							<img :src="item.avatar"/>
						</router-link>
						<div class="cart-info">
							<router-link :to="`/detail/${ item.pid }`"  class='name-wrapper'>
								<h3 v-text="item.name"></h3>
							</router-link>
							<div class='cart-info-footer'>
								<span class='price' v-text="`￥ ${ item.price }`"></span>
								<div class="count-wrapper">
									<Count :count="item.count" :decrease="e =>decrease({ id: item.id,loadingEl: e.target.parentNode })"
									         :increase="e =>increase({ id: item.id,loadingEl: e.target.parentNode })"></Count>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="footer footer-normal" :class="{ hide: isEdit }">
				<span class='all' @click="toggleAllSelect1(!allSelect1)"><i class='checkbox' :class="{ checked: allSelect1 }"></i>全选</span>
				<span class='account-wrapper'>合计： <em class='account' v-text="`￥${ account }`"></em></span>
				<button class='btn-settlement' @click="$router.push('/orderconfirm')" :disabled="total1 === 0" :class="{ disabled: total1 ===0 }">结算
					<em class='total' v-show="total1" v-text="`(${ total1 })`"></em></button>
			</div>
			<div class="footer footer-edit" :class="{ hide: !isEdit }">
				<span class='all' @click="toggleAllSelect2(!allSelect2)"><i class='checkbox' :class="{ checked: allSelect2 }"></i>全选</span>
				<button class="btn-delete" @click="remove" :disabled="total2 === 0" :class="{ disabled: total2 ===0 }">删除
					<em class='total' v-show="total2" v-text="`(${ total2 })`"></em></button>
			</div>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
        import { createNamespacedHelpers } from 'vuex';
        import emptyImage from './empty_cart.png';
        import Count from '../../components/Count'
        let {mapState,mapActions,mapMutations } = createNamespacedHelpers('cart');
        export default {
                components: { Count },
                data() {
                        return {
                                isEdit: false,                  //标识是否处于编辑状态
                                emptyImage
                        };
                },
                computed: {
                        ...mapState(['list']),
                        allSelect1() { return this.list.every(item=>item.select1); },
                        allSelect2() { return this.list.every(item =>item.select2); },
                        total1() { return this.list.reduce((result,item) =>item.select1 ? item.count + result: result,0 ); },
                        total2() { return this.list.reduce((result,item) =>item.select2 ? item.count + result: result,0 );  },
                        account() { return this.list.reduce((result,item) =>item.select1 ? item.count * item.price + result : result, 0); }
                },

                methods: {
                        ...mapMutations(['reset','toggleAllSelect1','toggleAllSelect2','toggleSelect1','toggleSelect2']),
                        ...mapActions(['init','remove','decrease','increase'])
                },
                created() {
                        this.init();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	i.checkbox
		display:inline-block
		width: 0.36rem
		height:0.36rem
		background:url(./icon_checkbox_uncheck.png) no-repeat center center
		background-size: 100%
		margin-right: 0.1rem
	i.checkbox.checked
		display:inline-block
		width: 0.36rem
		height:0.36rem
		background:url(./icon_checkbox_check.png) no-repeat center center
		background-size: 100%
	.page-wrapper
		display: flex
		width: 100%
		height: 100%
		flex-direction: column
		background-color: rgb(243, 243, 243);
		.header
			flex-shrink: 0
			height:0.9rem
			display: flex
			background: linear-gradient(to left, #fa4dbe 0, #fbaa58 100%)
			border-bottom: 1px solid #999
			color: #fff
			*
				line-height: 0.9rem;
				font-size: 0.32rem
			a.back
				width: 0.9rem
				color: #fff
				font-size: 0.45rem
				text-align: center
			h1.title
				flex-grow: 1
				text-align: center
				font-style: normal
			button.btn-edit-toggle
				border: none
				outline: none
				width: 0.9rem
				background-color: transparent
				font-size: 0.3rem
				color: #fff
				&.hide
					visibility: hidden
		.cart-empty
			flex-grow: 1
			display: flex
			flex-direction: column
			justify-content: center
			align-items: center
			img
				width: 1.8rem
				height: 1.8rem
			p
				color: #666
				font-size: 0.26rem
				padding: 0.26rem 0
			a
				width: 2rem
				height: 0.7rem
				line-height: 0.7rem
				border-radius: 0.35rem
				border: 1px solid #bb9e72
				color: #bb9e72
				text-align: center
				font-size: 0.26rem
		.content
			flex-grow: 1
			padding:0.2rem
			overflow: auto
			ul.cart-list
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
					i
						display:block
						flex-shrink: 0
						margin-left: 0.2rem
					a
						flex-shrink: 0
						align-items: center
						box-sizing: border-box
						padding: 0.1rem
						img
							width: 1.7rem
							background-color: #eee
					.cart-info
						display: flex
						flex-direction: column
						justify-content: space-around
						flex-grow: 1
						box-sizing: border-box
						padding: 0.1rem 0.2rem
						a
							color: #333
							h3
								font-style: normal
								font-weight: 500
								font-size: 0.3rem
						.cart-info-footer
							display:flex
							flex-direction: row
							justify-content: space-between
							margin-top: 0.5rem
							span.price
								font-size: 0.28rem
								color: rgb(191, 17, 17)
		.footer
			flex-shrink: 0
			height: 1.1rem
			background-color: #fff
			border-top: 1px solid #999
			justify-content: space-between
			display: flex
			flex-direction: row
			align-items: center
			width: 100%
			box-sizing: border-box
			padding: 0 0.2rem
			font-size: 0.3rem
			span.all
				vertical-align: middle
		.footer-normal
			span.all
				flex-shrink: 0
				width: 1.2rem
			span.account-wrapper
				flex-grow: 1
				text-align: right
				margin-right: 0.1rem
				em.account
					font-size: 0.32rem
					color: rgb(191, 17, 17)
					font-style: normal
					font-weight: bold
					margin-right: 0.1rem
			button.btn-settlement
				flex-shrink: 0
				width: 1.8rem
				height: 65%
				outline: none
				border: none
				background-color: rgb(191, 17, 17)
				border-radius: 0.3rem
				color: white
				font-size: 0.3rem
				&.disabled
					background-color: #b0b0b0
		.footer.hide
			display:none
		.footer-edit
			span.all
				flex-shrink: 0
			button.btn-delete
				text-align: center
				width: 1.8rem
				height: 65%
				outline: none
				border: none
				background-color: red
				border-radius: 0.3rem
				color: white
				font-size: 0.3rem
				&.disabled
					background-color: #b0b0b0
</style>