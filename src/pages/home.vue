<template>
    <el-container>
      <el-header class="homeHeader">
          <div class="title">微图书管理平台</div>
          <div>
              <el-button :icon="collapseClass" type="text" @click="collapseHandler" style="color: #000000; font-size:16px"></el-button>
              <el-button icon="el-icon-bell" type="text" style="margin-right: 20px;color: #000000; font-size:16px"></el-button>
              <el-dropdown class="userInfo" @command="commandHandler">
              <span class="el-dropdown-link">
                Hi，{{user.userName}}<i><img :src="head" class="head" alt=""></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                      <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
                      <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </el-header>
      <el-container>
          <el-aside :style="leftMenuStyle">
              <el-menu router :collapse="isCollapse" >
                  <el-submenu v-for="(item,index) in menus" :index="index+''" :key="index">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span><b>{{item.name}}</b></span>
                    </template>
                    <el-menu-item :index="subItem.path" v-for="(subItem,indexj) in item.children" :key="indexj">
                        <i :class="subItem.icon"></i>{{subItem.name}}
                    </el-menu-item>
                  </el-submenu>
              </el-menu>
          </el-aside>
          <el-main style="padding:0px;">
              <!--主区-->
              <el-container>
                <el-header class="main-header" style="height:45px; ">
                    <el-breadcrumb separator="/" >
                        <el-breadcrumb-item :to="{ path: '/home' }">Home </el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                  <el-main style="padding:10px;">
                      <template v-if="this.$router.currentRoute.path=='/home'">
                        <div style="padding:10px">
                            <el-row :gutter="20">
                                <el-col :span="17">
                                    <el-card class="box-card" shadow="hover">
                                        <div class="card-header">最新图书</div>
                                        <div class="book-item" v-for="book in books" :key="book.id">
                                            <div class="img"><img width="90" :src="handleImg(book.imgUrl)" ></div>
                                            <div class="content">
                                                <div style="height:30px">
                                                    <div class="title">
                                                        <el-link type="text" @click="gotoBookDetails(book.id)">{{book.bookName}}</el-link>
                                                    </div>
                                                    <div class="category">
                                                        <el-tag type="success" size="mini">{{book.dicCategoryName}}</el-tag>
                                                    </div>
                                                </div>
                                                <div class="introduction">
                                                    {{book.introduction}}
                                                </div>
                                                <div class="author">
                                                    {{book.authorName}}
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="7">
                                    <el-card class="box-card" shadow="hover">
                                        <div class="card-header">作品量排行</div>
                                        <div v-for="author in authors" :key="author.id">
                                            <div class="author-item">
                                                <div style="float:left"><img class="author-item-img" :src="handleImg(author.imgUrl)"></div>
                                                <div style="float:left">
                                                    <span class="author-text">
                                                        <el-link :underline="false" @click="gotoAuthorDetails(author.id)">{{author.name}}</el-link>
                                                    </span>
                                                    <span class="author-book-text"> ({{author.num}})</span>
                                                </div>
                                            </div>
                                            <div style="clear:both"></div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                      </template>
                      <router-view class="homeRouterView"></router-view>
                  </el-main>
              </el-container>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
    export default {
        data() {
            return {
                menus: [],
                books:[],
                authors:[],
                user: this.db.get("USER"),
                head: 'https://vuejs.bootcss.com/images/logo.png',
                isCollapse: false
            }
        },
        created() {
            this.head = this.config.baseApi + this.db.get("USER").headImgUrl;
            this.getUserMenu();
            this.getNewBooks();
            this.getRankingAuthors();
        },
        computed: {
            leftMenuStyle:function(){
                if(!this.isCollapse){
                    return 'width:200px';
                }else{
                    return 'width:65px';
                }
            },
            collapseClass:function(){
                if(!this.isCollapse){
                    return 'el-icon-s-unfold';
                }else{
                    return 'el-icon-s-fold';
                }
            }
        },
        methods:{
            commandHandler(cmd) {
                // 退出登录
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        this.db.remove("USER")
                        this.db.remove("USER_ROUTER")
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                } else if (cmd == 'userinfo'){
                    this.$router.push("../userinfo");
                } else if (cmd == 'pwd'){
                    this.$router.push("../pwd");
                }
            },
            handleImg(url) {
                let fullUrl = "";
                if(url){
                    fullUrl = this.config.baseApi + url;
                }
                return fullUrl;
            },
            collapseHandler(){
                // 折叠菜单处理
                if(this.isCollapse){
                    this.isCollapse = false;
                }else{
                    this.isCollapse = true;
                }
            },
            gotoAuthorDetails(id){
                this.$router.push("../book/author-details/"+id);
            },
            gotoBookDetails(id){
                this.$router.push("../book/book-details/"+id);
            },
            getUserMenu() {
                // 获取用户菜单
                let uid = this.user.userId;
                this.getRequest('/system/org/permission/get-user-menus', {userId:uid}).then(resp => {
                    if (resp.code && resp.code == 200) {
                        this.menus = resp.data;
                    }
                })
            },
            getNewBooks() {
                // 获取最新图书
                this.getRequest('/index/get-new-books', {limit:6}).then(resp => {
                    if (resp.code && resp.code == 200) {
                        this.books = resp.data;
                    }
                })
            },
            getRankingAuthors() {
                // 获取作者排行
                this.getRequest('/index/get-ranking-authors', {limit:15}).then(resp => {
                    if (resp.code && resp.code == 200) {
                        this.authors = resp.data;
                    }
                })
            }
        }
    }
</script>

<style>
    body {margin: 0px}

    .el-main{ width: 100}

    .homeRouterView {
        margin-top: 0px; width:100%; 
    }

    .homeWelcome {
        text-align: center;
        font-family: 华文行楷;
        color: #409eff;
    }

    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 32px;
        height: 32px;
        border-radius: 24px;
        margin-left: 8px;
        margin-right: 10px; 
    }

    .el-dropdown-link {
        color: rgb(32, 25, 25);
        display: flex;
        align-items: center;
    }

    .main-header{
        line-height: 45px; 
        background:#e4f5ff; 
        padding: 15px; 
        width:100%
    }

    .card-header{
        padding-bottom:20px;
        font-weight: bold;
    }

    .text {
        font-size: 14px;
    }

    .book-item{
        height: 130px;
        margin-bottom: 20px
    }
    .book-item .img{
        float:left;width:16%
    }
    .book-item .content{
        float:left; width:84%
    }
    .book-item .content .title{
        float:left; width:80%
    }
    .book-item .content .category{
        text-align:right; float:left; width:20%
    }
    .book-item .content .introduction{
        color:#b1aeae;font-size:12px; height:78px
    }
    .book-item .content .author{
        color:#9db4e5;font-size:13px;font-weight:bold; height:26px
    }

    .author-text {
        font-size: 14px;
        color: rgb(221, 103, 133);
        font-weight: bold;
    }

    .author-book-text{
        font-size: 14px;
        color: rgb(175, 178, 182);
    }

    .author-item {
        height: 48px;
        line-height: 48px;
        display: block;
    }

    .author-item-img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-right: 10px; 
    }
</style>