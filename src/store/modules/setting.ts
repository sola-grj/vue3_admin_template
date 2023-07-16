// 小仓库 layout组件相关配置
import { defineStore } from 'pinia'
const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用户控制菜单是折叠还是收起
      refresh: false, // 仓库刷新属性
    }
  },
})
export default useLayoutSettingStore
