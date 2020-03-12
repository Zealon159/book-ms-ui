<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small" label-width="135px" >
            <el-form-item label="登录名" prop="userId">
                <span>{{userForm.userId}}</span>
            </el-form-item>
            <el-form-item label="昵称" prop="userName">
                <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNumber">
                <el-input v-model="userForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="我的角色" prop="roles">
                <el-tag v-for="item in userForm.roles" :key="item" type="success" style="margin-right:10px">{{item}}</el-tag>
            </el-form-item>
            <el-form-item label="排序" prop="sortNumber">
                <span>{{userForm.sortNumber}}</span>
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
            return {
                userForm: {
                    userName: '',
                    userId: '',
                    deptName: '',
                    phoneNumber: '',
                    sortNumber: '',
                    sysAttachmentPortrait:'',
                    roles:[]
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.initForm();
        },
        methods: {
            async initForm(){
                let user = this.db.get("USER");
                if(user && user.userId){
                    this.userForm = user;
                }else{
                    // 接口获取个人信息
                }

            },
            submitForm(userForm) {
                this.$refs[userForm].validate((valid) => {
                if (valid) {
                    this.putRequest('/user/update', this.userForm).then(resp => {
                        if (resp && resp.code==200) {
                            // 更新本地用户信息
                            let user = this.db.get("USER");
                            user.userName = this.userForm.userName;
                            user.phoneNumber = this.userForm.phoneNumber;
                            this.db.remove("USER");
                            this.db.save("USER",user);
                        }
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