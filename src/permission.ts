// 路由鉴权
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取用户相关仓库数据
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 访问某一个路由之前会触发
  nprogress.start()
  // 获取token判断用户登录状态
  const token = userStore.token
  if (token) {
    // 用户登录
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: {} })
    }
  }
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 访问某一个路由之后会触发
  nprogress.done()
})

// 全部路由 登录｜404｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）

// 用户未登录，可以访问login ，其余六个路由不能访问（指向login）
// 用户登录 不可以访问login（指向首页）其余正常访问
