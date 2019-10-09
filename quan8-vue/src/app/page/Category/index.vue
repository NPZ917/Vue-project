<template>
	<div class='page-wrapper'>
		<div class="header">
			<router-link to="/home">
				<i class="iconfont icon-back"></i>
			</router-link>
			<h1>分类</h1>
			<router-link to="/home">
				<i class="iconfont icon-sort"></i>
			</router-link>
		</div>
            <div class='content'>
                <div class='left'>
                    <ul>
                        <li v-for="item in mainList" :key="item.id" :class="{ active : activeId === item.id }" :data-id="item.id" @click="toggleId(item.id)">
				<span v-text="item.name"></span>
			</li>
                    </ul>
                </div>
                <div class='right'>
	                <ul v-if="subList.length > 0">
		                <li v-for="item in subList"  :key="item.id">
			                <router-link :to="`/list/${ activeId }/${ item.id }`">
				                <img :src="item.avatar" alt="">
				                <span v-text="item.name"></span>
			                </router-link>
		                </li>
	                </ul>
	                <p v-else>暂无相关分类信息,敬请期待</p>
                </div>
            </div>
            <div class='footer'>
		        <Nav/>
            </div>
        </div>
</template>

<script type="text/ecmascript-6">
        import { createNamespacedHelpers } from 'vuex';
        import Nav from '../../components/Nav';

        let { mapState, mapActions, mapGetters } = createNamespacedHelpers('category');

        export default {
                components: { Nav },
                //计算属性存放（对应的函数一定要返回一个结果）
                computed: {
	                ...mapState(['list', 'activeId']),
	                ...mapGetters(['subList']),
                        mainList: function(){
                                return this.list.filter(item => item.fid === 0);
                        },
                        avatar: function(){
                                return this.activeId === 0 ? '' : this.list.find(item => item.id === this.activeId).avatar;
                        },
                },
                //监听指定的数据成员的变化
                methods: mapActions(['init', 'toggleId']),
                created: function(){ this.init().then(data => this.toggleId(data[0].id)); },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
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
			border-top: 1px solid #b0b0b0
			border-bottom: 1px solid #b0b0b0
			display: flex
			overflow: hidden
			.left
				width: 1.5rem
				flex-shrink: 0
				overflow-y: auto
				background-color: #F4F4F4
				ul
					li
						padding: 0.26rem 0
						color: #333
						border-left: 3px solid transparent
						span
							display: block
							height: 0.48rem
							line-height: 0.48rem
							text-align: center
						&.active
							color: #fc3f78
							border-left-color: rgb(252, 63, 120)
							background-color: #fff
			.right
				flex-grow: 1
				overflow: auto
				padding: 0.3rem
				ul
					margin-right: -0.6rem
					li
						float: left
						box-sizing: border-box
						width: 33.33%
						padding-right: 0.6rem
						margin-bottom: 0.4rem
						a
							display: flex
							flex-direction: column
							align-items: center
							width: 100%
							img
								width: 100%
							span
								color: #666666
								margin-top: 0.1rem
		.footer
			flex-shrink: 0
			height: 1rem
</style>