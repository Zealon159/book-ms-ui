<template>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" 
        v-loading="loading"
        element-loading-text="正在登录..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="loginContainer">
        <h3 class="loginTitle">系统登录</h3>
        <el-form-item prop="userId">
            <el-input v-model="loginForm.userId" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" placeholder="密码" v-model="loginForm.pwd"  @keydown.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default{
        name:'login',
        data(){
            return{
                loading: false,
                loginForm: {
                    userId: '',
                    pwd: '',
                    remenber: 1
                },
                rules: {
                    userId: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            if (resp.success) {
                                //this.$store.commit('INIT_CURRENTHR', resp.obj);
                                window.sessionStorage.setItem("user", JSON.stringify(resp.user));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                            }
                        })
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }
</style>