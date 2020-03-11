<template>
    <el-container>
      <el-header class="homeHeader">
          <div class="title">创新版管理平台</div>
          <div>
              <el-button :icon="collapseClass" type="text" @click="collapseHandler" style="color: #000000; font-size:16px"></el-button>
              <el-button icon="el-icon-bell" type="text" style="margin-right: 20px;color: #000000; font-size:16px"></el-button>
              <el-dropdown class="userInfo" @command="commandHandler">
              <span class="el-dropdown-link">
                Hi，{{user.userName}}<i><img :src="head" class="head" alt=""></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                      <el-dropdown-item command="setting">设置</el-dropdown-item>
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
                  <el-header style="height:45px; line-height: 45px; background:#eaf7ff; padding: 15px">
                    <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                  </el-header>
                  <el-main style="padding:10px">
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎使用 ~ 
                    </div>
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
                user: this.db.get("USER"),
                head: 'https://vuejs.bootcss.com/images/logo.png',
                isCollapse: false
            }
        },
        created() {
            this.getUserMenu();
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
                    this.$router.push("user");
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
            getUserMenu() {
                // 获取用户菜单
                let uid = this.user.userId;
                this.getRequest('/system/org/permission/get-user-menus', {userId:uid}).then(resp => {
                    if (resp.code == 200) {
                    this.menus = resp.data;
                    }
                })
            }
        }
    }
</script>

<style>
    body {margin: 0px}

    .homeRouterView {
        margin-top: 0px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409eff;
        padding-top: 50px;
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
</style>