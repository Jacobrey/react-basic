// 封装和评到相关的接口
import request from "utils/request";
/**
 * 获取频道数据
 * @returns 
 */
export function getChannels() {
    return request.get("/channels")
}