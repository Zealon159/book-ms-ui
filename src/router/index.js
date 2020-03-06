import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 定义系统默认隐藏路由
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
// 组织
const deptList = r => require.ensure([], () => r(require('@/pages/org/dept-list')), 'dept-list');
const deptAdd = r => require.ensure([], () => r(require('@/pages/org/dept-add')), 'dept-add');
const deptEdit = r => require.ensure([], () => r(require('@/pages/org/dept-edit')), 'dept-edit');
// 用户
const userList = r => require.ensure([], () => r(require('@/pages/org/user-list')), 'user-list');
const userAdd = r => require.ensure([], () => r(require('@/pages/org/user-add')), 'user-add');
const userEdit = r => require.ensure([], () => r(require('@/pages/org/user-edit')), 'user-edit');
// 角色
const roleList = r => require.ensure([], () => r(require('@/pages/org/role-list')), 'role-list');
const roleAdd = r => require.ensure([], () => r(require('@/pages/org/role-add')), 'role-add');
const roleEdit = r => require.ensure([], () => r(require('@/pages/org/role-edit')), 'role-edit');
// 菜单/权限
const permissionList = r => require.ensure([], () => r(require('@/pages/org/permission-list')), 'permission-list');
const permissionAdd = r => require.ensure([], () => r(require('@/pages/org/permission-add')), 'permission-add');
const permissionEdit = r => require.ensure([], () => r(require('@/pages/org/permission-edit')), 'permission-edit');

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
				path: '/org/dept-list',
				name: '组织管理',
				component: deptList,
				hidden: false,
				meta: [
					{name:'组织管理',path:'/org/dept-list'}
				]
			},
			{
				path: '/org/dept-add',
				name: '新增组织',
				component: deptAdd,
				hidden: false,
				meta: [
					{name:'组织管理',path:'/org/dept-list'},
					{name:'新增组织',path:''}
				]
			},
			{
				path: '/org/dept-edit/:id',
				name: '编辑组织',
				component: deptEdit,
				hidden: false,
				meta: [
					{name:'组织管理',path:'/org/dept-list'},
					{name:'编辑组织',path:''}
				]
			},
			{
				path: '/org/user-list',
				name: '用户管理',
				component: userList,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/org/user-list'}
				]
			},
			{
				path: '/org/user-add',
				name: '新增用户',
				component: userAdd,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/org/user-list'},
					{name:'新增用户',path:''}
				]
			},
			{
				path: '/org/user-edit/:id',
				name: '编辑用户',
				component: userEdit,
				hidden: false,
				meta: [
					{name:'用户管理',path:'/org/user-list'},
					{name:'编辑用户',path:''}
				]
			},
			{
				path: '/org/role-list',
				name: '角色管理',
				component: roleList,
				hidden: false,
				meta: [
					{name:'角色管理',path:'/org/role-list'}
				]
			},
			{
				path: '/org/role-add',
				name: '新增角色',
				component: roleAdd,
				hidden: false,
				meta: [
					{name:'角色管理',path:'/org/role-list'},
					{name:'新增角色',path:''}
				]
			},
			{
				path: '/org/role-edit/:id',
				name: '编辑角色',
				component: roleEdit,
				hidden: false,
				meta: [
					{name:'角色管理',path:'/org/role-list'},
					{name:'编辑角色',path:''}
				]
			},
			{
				path: '/org/permission-list',
				name: '菜单权限',
				component: permissionList,
				hidden: false,
				meta: [
					{name:'菜单权限',path:'/org/permission-list'}
				]
			},
			{
				path: '/org/permission-add',
				name: '新增菜单权限',
				component: permissionAdd,
				hidden: false,
				meta: [
					{name:'菜单权限',path:'/org/permission-list'},
					{name:'新增菜单权限',path:''}
				]
			},
			{
				path: '/org/permission-edit/:id',
				name: '编辑菜单权限',
				component: permissionEdit,
				hidden: false,
				meta: [
					{name:'菜单权限',path:'/org/permission-list'},
					{name:'编辑菜单权限',path:''}
				]
			}
		]
	}
]

// 初始化路由对象
export default new Router({
	routes
})