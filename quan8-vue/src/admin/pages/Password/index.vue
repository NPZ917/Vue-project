<template>
	<el-form label-width="100px" :status-icon="true" class="form"  :model="model" :rules="rules" ref="form">
		<el-form-item label="原始密码："  prop="oldPwd">
			<el-input type="password" v-model="model.oldPwd" ></el-input>
		</el-form-item>
		<el-form-item label="新密码："  prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码确认:" prop="checkNewPwd">
			<el-input type="password"  v-model="model.checkNewPwd"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="changePwd">确认</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
        import API from '../../util/api.js';

        export default {
                data() {
                        return {
                                model: { oldPwd: '', newPwd: '', checkNewPwd: '' },
                                rules: {
                                        oldPwd: [
                                                { required: true, trigger: 'blur', message: '原始密码不能为空'},
                                                { min: 4, max: 10, trigger: 'blur', message: '长度不许在4-10长度' }
                                        ],
                                        newPwd: [
                                                { validator: this.validatePass1, trigger: 'blur' }
                                        ],
                                        checkNewPwd: [
                                                { validator: this.validatePass2, trigger: 'blur' }
                                        ]
                                }
                        }
                },
                methods: {
                        validatePass1(rule, value, callback) {
                                if(value ==='') callback(new Error('新密码不能为空'));
                                else if(value.length<4 || value.length > 10) callback(new Error('密码长度4-10'));
                                else if(this.model.checkNewPwd !=='') { this.$refs.form.validateField('checkNewPwd'); callback(); }
                                else callback();
                        },
                        validatePass2(rule, value, callback) {
                                if(value ==='') callback(new Error('新密码不能为空'));
                                else if(value.length<4 || value.length > 10) callback(new Error('密码长度4-10'));
                                else if(this.model.newPwd !==this.model.checkNewPwd)  callback(new Error('两次新密码不一致'));
                                else callback();
                        },
                        changePwd(){
                                this.$refs.form.validate()
                                        .then(() => {
                                                API.user.changePwd(this.model).then(()=>this.$refs.form.resetFields());
                                        })
                                        .catch(() => {});
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.form
		width: 400px
</style>