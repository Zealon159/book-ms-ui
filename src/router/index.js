import Vue from 'vue'
import Router from 'vue-router'
import db from "../utils/sessionStorage"
import {getRequest} from "../utils/request"
Vue.use(Router)

// 静态路由
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const constRouter = [
	{
		path: '/',
		name: '登录页',
		component: login,
		hidden: true
	}
]

// 动态路由主页
const dynamicRouter = [
	{
		path: '/home',
		name: '主页',
		component: home,
		hidden: true,
		children:[]
	}
]

let router = new Router({
	routes: constRouter
})

// 导航守卫，处理动态路由
let asyncRouter
router.beforeEach((to, from, next) => {
	let user = db.get("USER")
	let userRouter = db.get('USER_ROUTER')
	
	if(user && user.userId){
		if (!asyncRouter || asyncRouter=='') {
			if (!userRouter || userRouter=='' || userRouter==null) {
				getRequest('/system/org/permission/get-user-router', {userId:user.userId}).then(resp => {
					if (resp.code == 200) {
						asyncRouter = resp.data
						if(resp.data.length>0){
							db.save('USER_ROUTER', resp.data)
						}
						loadAsyncRouter(to, next)
					}
				})
			} else {
				asyncRouter = userRouter
				loadAsyncRouter(to, next)
			}
		} else {
			next()
		}
	} else {
		next()
	}
})

// 载入异步路由
function loadAsyncRouter (to, next) {
	if(asyncRouter.length > 0){
		asyncRouter = filterAsyncRouter(asyncRouter)
		dynamicRouter.find(v => v.path === '/home').children.push(...asyncRouter)
		router.addRoutes(dynamicRouter)
	}
	next({...to, replace: true})
}

// 过滤路由
function filterAsyncRouter(routes){
	return routes.filter((route) => {
		route.component = resolveComponent(route.component)
		return true
	})
}

// 解析组件
function resolveComponent (path) {
	return function (resolve) {
		import(`@/pages/${path}.vue`).then(mod => {
			resolve(mod)
		})
	}
}

export default router