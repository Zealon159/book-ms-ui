<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="作者名称" prop="name">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="attachmentIds">
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
            <el-form-item label="简介" prop="introduction">
                <el-input v-model="dataForm.introduction"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
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
                dataForm: {
                    id:'',
                    name: '',
                    introduction: '',
                    headImgUrl:'',
                    attachmentIds: []
                },
                rules: {
                    introduction: [
                        { required: true, message: '请输入简介', trigger: 'blur' }
                    ],name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.initData();
        },
        methods: {
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.putRequest('/book-author/update', this.dataForm).then(resp => {
                        if (resp && resp.code==200) {
                            this.$router.push('/book/author-list');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            initData(){
                // 详情
                let id = this.$route.params.id;
                this.getRequest('/book-author/details', {id:id}).then(resp => {
                    if (resp.code == 200) {
                        this.dataForm = resp.data;
                        this.dataForm.attachmentIds = [];
                        this.imageUrl = this.config.baseApi + resp.data.headImgUrl;
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            },
            upload(item){
                let formData = new FormData()
                formData.append('file', item.file)
                formData.append('tableCode', 'author')
                formData.append('tableField', 'head')
                this.postRequest('/upload', formData).then(resp => {
                    if (resp && resp.code==200) {
                        let attachment = resp.data.attachments[0];
                        this.dataForm.attachmentIds[0] = attachment.id;
                        this.dataForm.headImgUrl = attachment.path;
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
        width: 128px;
        height: 128px;
        line-height: 128px;
        text-align: center;
    }
    .avatar {
        width: 128px;
        height: 128px;
        display: block;
    }
</style>