// 用户封装所有的localstorage的操作
const TOKEN_KEY = 'panpan-token'

/**
 * 保存token
 * @param {*} token 
 * @returns 
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
/**
 * 获取token
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)
/**
 * 判断是否有token
 * @returns 
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
/**
 * 判断是否有token
 * @returns 
 */
export const hasToken = () => !!getToken()