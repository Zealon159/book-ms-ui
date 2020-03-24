<h1 align="center"> 微图书管理平台 </h1>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-blue" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.13.0-blue" alt="element-ui">
  </a>
  <a href="https://github.com/Zealon159/book-ms-ui/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow" alt="license">
  </a>
</p>

演示地址：[http://books.zealon.cn/](http://books.zealon.cn/)

## 项目介绍

基于 vue.js 、element-ui 搭建一个极简的图书管理平台。项目功能不是很多，但是前后端分离的项目，该用到的技术点也都会涉及到，很适合开始准备学 vue 的同学，具体有以下特点：

- 完备组织架构体系，基于 RBAC 模型实现用户权限配置

- 基于导航守卫，动态生成路由、用户菜单、面包屑导航等

- axios 异步请求统一封装，统一处理操作结果通知
- element-ui 组件使用覆盖率达到 70% 以上

项目接口工程基于 SpringBoot2.x 开发，[点击进入仓库](https://github.com/Zealon159/book-ms-interface)

## 项目截图

![image](https://zealon.cn/upload/github/book-ms-ui/login.jpg)

![image](https://zealon.cn/upload/github/book-ms-ui/home.jpg)

![image](https://zealon.cn/upload/github/book-ms-ui/book-list.jpg)

![image](https://zealon.cn/upload/github/book-ms-ui/book.jpg)

##  其它说明

虽是一款图书管理平台，更恰切滴描述的话，其实是一个后台管理的脚手架，任何后台管理内容的方式都大同小异，无非是一套通用的组织权限管理，在这个基础上，也可以用来开发自己想维护的任何模块，对吧

## 快速开始

### 工程结构

```
- assets / 资源
  - router / 路由
  - utils / 
    - config / 静态配置
    - request / axios封装
    - sessionStorage / 本地存储封装
  - style / 样式文件
  - App.vue
  - vue.config.js
  - pages / 组件
    - book / 图书、章节、作者
    - dictionary / 数据字典
    - org / 组织、用户、角色、权限
    - user / 个人信息
    - welfare / 小福利
```

### 环境安装

1.拉取项目至本地

命令：`git clone https://github.com/Zealon159/book-ms-ui.git`

2.初始化npm依赖

使用cd命令进入本地工程目录，再用 cnpm 安装依赖，`cnpm install`

3.启动

命令：`npm run serve`，启动成功 `http://localhost:9000/ `，默认端口9000，可以进入 `vue.config.js` 配置文件修改端口

## License

[MIT](https://github.com/Zealon159/book-ms-ui/blob/master/LICENSE)

Copyright (c) 2020 光彩盛年
