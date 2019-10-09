<template>
	<el-dialog :visible="true" width="500px" :show-close="false" :modal="false" :center="true">
		<div slot="title">
			<h1>券吧后台管理系统</h1>
		</div>
		<el-form label-width="80px" :rules="rules" :model="model" :status-icon="true" ref="form">
			<el-form-item label="用户名: " prop="name">
				<el-input v-model="model.name" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
			</el-form-item>
			<el-form-item label="密码: " prop="pwd">
				<el-input type="password" v-model="model.pwd" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button @click="$refs.form.resetFields()">重置</el-button>
			<el-button type="primary" @click="login">登录</el-button>
		</div>
	</el-dialog>

</template>

<script type="text/ecmascript-6">
        import API from '../../util/api.js';

        export default {
                data() {
                        return {
                                model: { name: '', pwd: '' },
                                rules: {
                                        name: [
                                                { required: true, trigger: 'blur', message: '用户名不能为空' },
                                                { min: 3, max: 10, trigger: 'blur', message: '用户名长度必须在5 - 10之间' }
                                        ],
                                        pwd: [
                                                { required: true, trigger: 'blur', mesage: '密码不能为空' },
                                                { min: 3, max: 10, trigger: 'blur', message: '密码的长度必须在5 -10 之间' }
                                        ]
                                }
                        }
                },
                methods: {
                        login() {
                                this.$refs.form.validate()
                                        .then(() => API.user.login(this.model))      //发ajax
                                        .then(token => {                                          //将token保存
                                                sessionStorage.setItem('token', token);
                                                sessionStorage.setItem('name', this.model.name);
                                                this.$router.replace('/home');
                                        })
                                        .catch(() => {});
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>