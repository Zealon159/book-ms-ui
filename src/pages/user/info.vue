<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small" label-width="135px" >
            <el-form-item label="我的头像" prop="attachmentIds">
                <el-upload
                    name="file"
                    class="avatar-uploader"
                    action="nothing"
                    :http-request="upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
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
                imageUrl:'',
                userForm: {
                    userName: '',
                    userId: '',
                    deptName: '',
                    phoneNumber: '',
                    sortNumber: '',
                    headImgUrl:'',
                    attachmentIds: [],
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
                    this.userForm.attachmentIds = [];
                    this.imageUrl = this.config.baseApi + user.headImgUrl;
                }else{
                    // 接口获取个人信息
                    this.getRequest('/user-info',{}).then(resp => {
                        if (resp.code == 200) {
                            this.userForm = resp.data;
                            this.userForm.attachmentIds = [];
                            this.imageUrl = this.config.baseApi + "/" + resp.data.headImgUrl;
                        }
                    })
                }

            },
            submitForm(userForm) {
                this.$refs[userForm].validate((valid) => {
                if (valid) {
                    let rolesCN = this.userForm.roles;
                    this.userForm.roles = [];
                    this.putRequest('/user/update', this.userForm).then(resp => {
                        if (resp && resp.code==200) {
                            this.userForm.roles = rolesCN;
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
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt100K = file.size / 1024 / 100 < 1;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                
                if (!isLt100K) {
                    this.$message.error('上传头像图片大小不能超过 100KB!');
                }
                return isJPG && isLt100K;
            },
            upload(item){
                let formData = new FormData()
                formData.append('file', item.file)
                formData.append('tableCode', 'user')
                formData.append('tableField', 'head')
                this.postRequest('/upload', formData).then(resp => {
                    if (resp && resp.code==200) {
                        let attachment = resp.data.attachments[0];
                        this.userForm.attachmentIds[0] = attachment.id;
                        this.userForm.headImgUrl = attachment.path;
                        this.imageUrl = this.config.baseApi + attachment.path;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 92px;
        height: 92px;
        line-height: 92px;
        text-align: center;
    }
    .avatar {
        width: 92px;
        height: 92px;
        display: block;
    }
</style>