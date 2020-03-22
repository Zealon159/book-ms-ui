<template>
    <div class="defaultForm">
        
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="100px" >
            <el-row :gutter="30" >
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item label="所属分类" prop="dicCategory">
                            <el-select v-model="dataForm.dicCategory" placeholder="请选择分类">
                                <el-option v-for="item in categoryOptions" :key="item.id" :label="item.text" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属频道" prop="dicChannel">
                            <el-radio-group v-model="dataForm.dicChannel">
                                <el-radio v-for="(item,index) in channelOptions" :key="index" :label="item.id" name="channels">{{item.text}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="连载状态" prop="dicSerialStatus">
                            <el-radio-group v-model="dataForm.dicSerialStatus">
                                <el-radio v-for="(item,index) in serialStatusOptions" :key="index" :label="item.id" name="channels">{{item.text}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="上架状态" prop="onlineStatus">
                            <el-switch
                                v-model="dataForm.onlineStatus"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                        </el-form-item>
                        <el-form-item label="作者" prop="authorId">
                            <el-select v-model="dataForm.authorId" 
                                placeholder="输入关键字查询作者"
                                filterable
                                remote 
                                :remote-method="getAuthorOptions"
                                :loading-text="loadingText"
                                :loading="loading">
                                <el-option
                                    v-for="item in authorOptions"
                                    :key="item.id"
                                    :label="item.text"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图书名称" prop="bookName">
                            <el-input v-model="dataForm.bookName"></el-input>
                        </el-form-item>
                        <el-form-item label="BookID" prop="bookId">
                            <el-input v-model="dataForm.bookId" maxlength="10" show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12" class="row-bg">
                    <div class="grid-content">
                        <el-form-item label="封面" prop="attachmentIds">
                            <el-upload
                                name="file"
                                class="avatar-uploader"
                                action="str"
                                :http-request="upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="评分" prop="bookScore">
                            <el-rate style="height:32px;line-height:32px; padding-top:5px" v-model="dataForm.bookScore" :max="10" :allow-half="true"> </el-rate>
                        </el-form-item>
                        <el-form-item label="字数" prop="wordCount">
                            <el-input v-model.number="dataForm.wordCount" style="width:150px"><template slot="append">万</template></el-input>
                        </el-form-item>
                        <el-form-item label="ISBN" prop="isbn">
                            <el-input v-model="dataForm.isbn"></el-input>
                        </el-form-item>
                        <el-form-item label="标签" prop="keyWord">
                            <el-input v-model="dataForm.keyWord"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" >
                <el-col :span="24">
                    <div class="grid-content-bottom">
                        
                        <el-form-item label="简介" prop="introduction">
                            <el-input type="textarea" :rows="4" v-model="dataForm.introduction"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
                            <el-button @click="$router.back(-1)">返回</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl:'',
                categoryOptions:[],
                channelOptions:[],
                serialStatusOptions:[],
                authorOptions:[],
                loading: false,
                loadingText:"作者加载中...",
                dataForm: {
                    authorId: '',
                    dicCategory: '',
                    dicChannel: 1,
                    dicSerialStatus: 1,
                    onlineStatus:true,
                    bookId:'',
                    bookName:'',
                    bookScore: 8,
                    keyWord:'',
                    imgUrl:'',
                    authorName:'',
                    introduction:'',
                    isbn:'',
                    wordCount:'',
                    attachmentIds: []
                },
                rules: {
                    authorId: [
                        { required: true, message: '请选择作者哦！', trigger: 'blur' }
                    ],
                    dicCategory: [
                        { required: true, message: '请选择分类！', trigger: 'blur' }
                    ],
                    dicChannel: [
                        { required: true, message: '请选择频道！', trigger: 'blur' }
                    ],
                    dicSerialStatus: [
                        { required: true, message: '请选连载状态！', trigger: 'blur' }
                    ],
                    onlineStatus: [
                        { required: true, message: '请选择上架状态！', trigger: 'blur' }
                    ],
                    bookId: [
                        { required: true, message: '请输入BookID！', trigger: 'blur' }
                    ],
                    bookName: [
                        { required: true, message: '请输入图书名称！', trigger: 'blur' }
                    ],
                    wordCount: [
                        { required: true, message: '请输入字数' },
                        { type: 'number', message: '必须为数字！' }
                    ]
                }
            };
        },
        created(){
            this.initForm();
        },
        methods: {
            async initForm(){
                await this.getDictionaryOptions("category");
                await this.getDictionaryOptions("channel");
                await this.getDictionaryOptions("serial_status");
            },
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.postRequest('/book/create', this.dataForm).then(resp => {
                        if (resp && resp.code==200) {
                            this.$router.push('/book/list');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            getAuthorOptions(keyword) {
                // 作者
                if (keyword !== '') {
                    this.loading = true;
                    this.getRequest('/book-author/get-select-options', {keyword:keyword}).then(resp => {
                        this.loading = false;
                        if (resp.code == 200) {
                            this.authorOptions = resp.data;
                        }
                    })
                } else {
                    this.authorOptions = [];
                }
            },
            async getDictionaryOptions(type){
                // 字典数据源
                this.getRequest('/data-dictionary/get-select-options', {type:type}).then(resp => {
                    if (resp.code == 200) {
                        if (type == "category"){
                            // 分类
                            this.categoryOptions = resp.data;
                        } else if (type == "channel"){
                            // 所属频道
                            this.channelOptions = resp.data;
                        } else if (type == "serial_status"){
                            // 连载状态
                            this.serialStatusOptions = resp.data;
                        }
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt200K = file.size / 1024 / 200 < 1;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只能是 JPG/PNG 格式!');
                }
                
                if (!isLt200K) {
                    this.$message.error('上传图片大小不能超过 200KB!');
                }
                return isJPG && isLt200K;
            },
            upload(item){
                let formData = new FormData()
                formData.append('file', item.file)
                formData.append('tableCode', 'book')
                formData.append('tableField', 'cover')
                this.postRequest('/upload', formData).then(resp => {
                    if (resp && resp.code==200) {
                        let attachment = resp.data.attachments[0];
                        this.dataForm.attachmentIds[0] = attachment.id;
                        this.dataForm.imgUrl = attachment.path;
                        this.imageUrl = this.config.baseApi + "/" + attachment.path;
                        if (success.data.msg) {
                            Message.success({message: success.data.msg})
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        width: 95%;
        margin-top: 5px 
    }

    .grid-content {
        border-radius: 4px;
        margin: 20px
    }
    .grid-content-bottom {
        border-radius: 4px;
        margin: 0px 20px 20px 20px
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #c9c0c0;
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
        width: 96px;
        height: 128px;
        line-height: 128px;
        text-align: center;
    }
    .avatar {
        width: 96px;
        height: 128px;
        display: block; 
    }
</style>