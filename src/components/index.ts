// 将svg注册成全局组件
import SvgIcon from '@/components/svgIcon/index.vue'

const allGlobaComponent: any = { SvgIcon }

export default {
  // 务必叫install
  install(app: any) {
    Object.keys(allGlobaComponent).forEach((key) => {
      app.component(key, allGlobaComponent[key])
    })
  },
}
