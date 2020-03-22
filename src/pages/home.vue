<template>
    <el-container>
      <el-header class="homeHeader">
          <div class="title">微图书管理平台</div>
          <div>
              <el-button :icon="collapseClass" type="text" @click="collapseHandler" style="color: #000000; font-size:16px"></el-button>
              <el-button icon="el-icon-bell" type="text" style=";color: #000000; font-size:16px;margin-right: 12px;"></el-button>
              <el-link href="https://github.com/Zealon159/book-ms-ui" target="_blank" style="margin-right: 30px;color: #000000; font-size:14px">
                <svg t="1584885153329" class="icon" viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8679" width="16" height="16"><path d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z" fill="#191717" p-id="8680"></path><path d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0" fill="#191717" p-id="8681"></path></svg>
              </el-link>
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
                                            <div class="img"><img width="90" :src="config.handleImgUri(book.imgUrl)" ></div>
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
                                                <div style="float:left"><img class="author-item-img" :src="config.handleImgUri(author.imgUrl)"></div>
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
            document.title = "微图书"
            this.head = this.config.baseApi + "/" + this.db.get("USER").headImgUrl;
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
                this.getRequest('/system/org/permission/get-user-menus', {}).then(resp => {
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