import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置 element-plus国际化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件所需的配置
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
// 引入模版的全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(globalComponent)
// 安装仓库
app.use(pinia)
// 注册模版路由
app.use(router)
// 引入鉴权
import './permission'
// 将应用挂载到挂载点上
app.mount('#app')
