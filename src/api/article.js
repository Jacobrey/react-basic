//封装和文章相关的接口
import request from "utils/request";

/**
 * 获取文章列表数据
 */

export const getArticles = (params) => {
    return request({
        url: '/mp/articles',
        method: 'get',
        params,
    })
}
/**
 * 删除文章接口
 */
export const delArticle = (id) => {
    return request.delete(`/mp/articles/${id}`)
}

/**
 * 发布文章
 */

export const addAritcle = (data, draft = false) => {
    return request({
        url: `/mp/articles?draft=${draft}`,
        method: 'post',
        data,
    })
}

