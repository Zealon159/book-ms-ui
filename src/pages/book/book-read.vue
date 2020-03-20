<template>
    <div class="defaultForm">
        <div class="title">
            {{dataForm.name}}
        </div>
        <el-input type="textarea" readonly="readonly" v-model="dataForm.content" class="content" rows="20" ></el-input> 
        <div style="margin-top:20px;text-align:center">
            <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="handlePreRead()"
                v-loading.fullscreen.lock="fullscreenLoading" >
                    上一章
                </el-button>
                <el-button type="primary" @click="gotoAuthorDetails()">书籍信息</el-button></el-button>
                <el-button type="primary" @click="handleNexRead()"
                v-loading.fullscreen.lock="fullscreenLoading" >
                    下一章<i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fullscreenLoading:false,
                dataForm: {
                    bookId:'',
                    id:'',
                    preId:0,
                    nextId:0,
                    name: '',
                    content: ''
                }
            };
        },
        created(){
            this.initData();
        },
        methods: {
            handlePreRead(){
                if(this.dataForm.preId>0){
                    this.getChapterInfo(this.dataForm.preId,true)
                }else{
                    this.$message('已经是首章节了~');
                }
            },
            handleNexRead(){
                if(this.dataForm.nextId>0){
                    this.getChapterInfo(this.dataForm.nextId,true)
                }else{
                    this.$message('已经是最后一章了~');
                }
            },
            gotoAuthorDetails(){
                this.$router.push("/book/book-details/" + this.dataForm.bookId);
            },
            initData(){
                // 详情
                let id = this.$route.params.id;
                this.getChapterInfo(id,false)
            },
            getChapterInfo(id,loading){
                if(loading){
                    this.fullscreenLoading = true;
                }
                this.getRequest('/book-chapter/read', {id:id}).then(resp => {
                    if(loading){
                        this.fullscreenLoading = false;
                    }
                    if (resp.code == 200) {
                        this.dataForm = resp.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        width: 94%;
        margin-top: 10px;
        margin-left: 30px;
    }

    .avatar {
        width: 92px;
        display: block;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .title{
        text-align:center;font-size:22px;
    }

    .content{
        margin-top:10px;font-size:13px;color:#b1aeae; 
    }

    .author{
        margin-top:10px;text-align:center;
    }
    
</style>