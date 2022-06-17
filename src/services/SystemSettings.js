import {LOGIN, ROUTES ,LOGOUT } from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    no: name,
    pass: password
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  return request(LOGOUT, METHOD.GET)
}
export default {
  login,
  logout,
  getRoutesConfig
}
