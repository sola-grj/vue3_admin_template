// 统一管理用户相关接口
import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 暴露请求函数
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
