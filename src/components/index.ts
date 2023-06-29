// 将svg注册成全局组件
import SvgIcon from '@/components/svgIcon/index.vue'
// 引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobaComponent: any = { SvgIcon }

export default {
  // 务必叫install
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGlobaComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobaComponent[key])
      // 将element-plus提供的图标注册为全局组件
      for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
      }
    })
  },
}
