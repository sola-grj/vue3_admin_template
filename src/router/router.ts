export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    // 登录成功后的首页
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    // 404页面
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    // 任意其他路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
