// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入路由（常量路由）
import { constantRoute } from '@/router/router'
// 引入本地持久化存储工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的数组（路由）
      username: '',
      avatar: '',
    }
  },
  // 异步逻辑处理
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        // 本地持久化存储
        SET_TOKEN(result.data.token as string)
        // 保证async函数返回一个成功的Promise
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {
      }
      console.log(result)
    },
    // 退出登录
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
