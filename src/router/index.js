import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 定义系统默认隐藏路由
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/pages/org/user-list')), 'user-list');
const userAdd = r => require.ensure([], () => r(require('@/pages/org/user-add')), 'user-add');
const userEdit = r => require.ensure([], () => r(require('@/pages/org/user-edit')), 'user-edit');
const routes = [
	{
		path: '/',
		name: '登录页',
		component: login,
		hidden: true
    },
    {
		path: '/home',
		name: '主页',
		component: home,
		hidden: true,
		children:[
			{
				path: '/user-list',
				name: '用户管理',
				component: userList,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/user-list'}
				]
			},
			{
				path: '/user-add',
				name: '新增用户',
				component: userAdd,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/user-list'},
					{name:'新增用户',path:''}
				]
			},
			{
				path: '/user-edit/:id',
				name: '编辑用户',
				component: userEdit,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/user-list'},
					{name:'编辑用户',path:''}
				]
			}
		]
	}
]

// 初始化路由对象
export default new Router({
	routes
})