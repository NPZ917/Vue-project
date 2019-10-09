<template>
	<el-container class="root">
		<el-header>
			<h1>券吧后台管理系统</h1>
		</el-header>
		<el-container>
			<el-aside>
				<!--item变色 submenu不变-->
				<el-menu
					:default-active="key"
					@select="handleMenuSelect"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b">

					<el-menu-item index="password">
						<i class="el-icon-setting"></i>
						<span>修改密码</span>
					</el-menu-item>

					<el-submenu index="manage">
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品管理</span>
						</template>

						<el-menu-item index="category">
							<i class="el-icon-menu"></i>
							<span>商品分类管理</span>
						</el-menu-item>

						<el-menu-item index="product">
							<i class="el-icon-menu"></i>
							<span>商品信息管理</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-tabs editable type="card" v-model="key" @tab-remove="handleTabRemove">
						<el-tab-pane
							v-for="item in tabs"
							:key="item"
							:label="tabMap[ item ].label"
							:name="item">
							<component :is="tabMap[item].component"></component>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer height="40px">
					<span>&copy; 版权所有: NPZ1997@163.com</span>
					<span>tel: 199-8888-8888</span>
					<span>网址: localhost:</span>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
        import Password from '../Password';
        import Category from '../Category';
        import Product from '../Product';

        export default {
                data() {
                        return {
                                key: '',
                                tabs: [],
                                tabMap: {
                                        password: {
                                                label: '修改密码',
                                                component: Password
                                        },
                                        category: {
                                                label: '商品分类管理',
                                                component: Category
                                        },
                                        product: {
                                                label: '商品信息管理',
                                                component: Product
                                        }
                                }
                        };
                },
                methods: {
                        handleMenuSelect(key) {
                                if(this.tabs.indexOf(key) === -1) this.tabs.push(key);
                                this.key = key;
                        },
                        handleTabRemove(key) {
                                let i = this.tabs.indexOf(key);
                                this.tabs.splice(i, 1);
                                if(this.key === key)
                                        this.key = this.tabs.length > 0 ? this.tabs[0] : '';
                        }
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
		min-width: 1200px
		.el-header
			display: flex
			align-items: center
			justify-content: center
			background-color: #000
			h1
				font-size: 30px
				color: #fff
				letter-spacing: 0.2rem
		.el-aside
			background-color: #303133
			.el-menu
				border: none
		.el-footer
			display: flex
			align-items: center
			border-top: 1px solid #b0b0b0
			span
				margin-right: 50px
</style>