<template>
    <el-container>
      <el-header class="homeHeader">
          <div class="title">创新版管理平台</div>
          <div>
              <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: #000000;" size="normal" ></el-button>
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
          <el-aside width="200px">
              <el-menu router :collapse="isCollapse" >
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-notebook-2"></i>
                      <span>图书管理</span>
                    </template>
                    <el-menu-item index="1-1">图书管理</el-menu-item>
                    <el-menu-item index="1-2">章节管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-s-tools"></i>
                      <span>后台管理</span>
                    </template>
                    <el-menu-item index="user-list">用户管理</el-menu-item>
                    <el-menu-item index="2-2">部门管理</el-menu-item>
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
            user: JSON.parse(window.sessionStorage.getItem("user")),
            head: 'https://vuejs.bootcss.com/images/logo.png',
            isCollapse: false
        }
    },
    computed: {
        /*routes() {
            return this.$store.state.routes;
        }*/
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
                window.sessionStorage.removeItem("user")
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