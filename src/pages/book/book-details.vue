<template>
    <div class="defaultForm">
        <div class="title">
            {{dataForm.bookName}}
        </div>
        <div class="author">
            <el-link :underline="false" @click="gotoAuthorDetails(dataForm.authorId)">{{dataForm.authorName}} </el-link>
        </div>
        <div class="intro">{{dataForm.introduction}}</div>
        <div style="margin-top:20px;">
            <div style="float:left;width:25%" v-for="chapter in chapters" :key="chapter.id">
                <el-button type="text" @click="gotoBookRead(chapter.id)">{{chapter.name}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                chapters:[],
                dataForm: {
                    id:'',
                    bookName: '',
                    introduction: '',
                    imgUrl:''
                }
            };
        },
        created(){
            this.initData();
        },
        methods: {
            gotoBookRead(id){
                this.$router.push("/book/book-read/"+id);
            },
            gotoAuthorDetails(id){
                this.$router.push("/book/author-details/"+id);
            },
            initData(){
                // 详情
                let id = this.$route.params.id;
                this.getRequest('/book/details', {id:id}).then(resp => {
                    if (resp.code == 200) {
                        this.dataForm = resp.data;
                    }
                })

                // 章节列表
                let form = {
                    page:1,
                    limit:10000,
                    bookId:id
                }
                this.getRequest('/book-chapter/get-list', form).then(resp => {
                    if (resp.code == 200) {
                        this.chapters = resp.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        width: 94%;
        margin-top: 25px;
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
        text-align:center;font-size:24px;font-weight:bold
    }

    .intro{
        margin-top:10px;font-size:13px;color:#b1aeae;
    }

    .author{
        margin-top:10px;text-align:center;
    }
    
</style>