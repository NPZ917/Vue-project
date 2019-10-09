<template>
	<div>
		<LoginInput type="text" placeholder="请输入用户名" @change="value => account = value"></LoginInput>
		<LoginInput type="password" placeholder="密码" @change="value => pwd = value"></LoginInput>
		<LoginButton value="登录" :click="login"></LoginButton>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput.vue';
	import LoginButton from './LoginButton.vue';
//	import http from '../../util/http.js';
	import API from '../../util/api.js';

        export default {
                components: { LoginInput, LoginButton },
	        data() {
                        return {
                                account: '',
	                        pwd: ''
                        };
	        },
	        methods: {
                        login(e) {
                                return API.user.loginByPwd(this.account, this.pwd, e.target)
                                        .then(token =>{
                                                sessionStorage.setItem('token', token);
                                                this.$router.replace(this.$route.params.reference);
                                                sessionStorage.setItem('name', this.account);
                                        });
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>