import axios from "axios"
import { getToken, hasToken, removeToken } from "./storage";
import { message } from "antd";
// import { history } from "./history";

export const baseURL = "http://geek.itheima.net/v1_0"

const instance = axios.create({
    baseURL,
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (hasToken()) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 对token过期进行统一的处理
    if (!error.response) {
        message.error("网络繁忙，请稍后重试")
        return Promise.reject(new Error('网络繁忙，请稍后重试'))
    }
    if (error.response.status === 401) {
        // 代表token 过期了
        // 1、删除token
        removeToken()
        // 给提示信息
        message.warn("登录信息过期了")
        // 跳转到登录界面
        window.location.href = "/login"
        // history.push("/login")

    }
    return Promise.reject(error);
});

export default instance