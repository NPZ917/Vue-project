<template>
	<div>
		<LoginInput placeholder="手机号码" @change="value => phone = value"></LoginInput>
		<LoginInput placeholder="短信验证码" @change="value =>code = value"></LoginInput>
		<LoginButton value="登录"></LoginButton>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput.vue';
	import LoginButton from './LoginButton.vue';
	import Vue from 'vue';

        export default {
                components: { LoginInput, LoginButton },
	        data() {
                        return {
                                phone: '',
	                        code: ''
                        };
	        },
	        methods: {
                        login() {
                                Vue.prototype.$alert('手机登录暂未开放, 请使用密码登录..')
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>