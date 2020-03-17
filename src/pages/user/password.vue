<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small" label-width="135px" >
            <el-form-item label="原始密码" prop="currentPwd">
                <el-input type="password" v-model="userForm.currentPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.userForm.checkPass != '') {
                        this.$refs.userForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateCheckPass = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value != this.userForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    currentPwd: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    currentPwd: [
                        { required: true, message: '请输入原始密码', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, required: true, trigger: 'blur'  }
                    ],
                    checkPass: [
                        { validator: validateCheckPass, required: true, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(userForm) {
                this.$refs[userForm].validate((valid) => {
                    if (valid) {
                        this.putRequest('/user/update-pwd', this.userForm).then(resp => {
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
</style>