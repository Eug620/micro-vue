/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 04:14:19
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 04:19:20
 * @FilePath: /micro-chat/src/api/article/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'articleIndex': '/article/index',
        'articleDetail': '/article/detail',
        'articleAdd': '/article/add',
        'articleUpdate': '/article/update',
        'articleDelete': '/article/delete',
    }
}

/// mock
const o = cloneDeep(Url.server)
Url['mock'] = {}
Object.entries(o).forEach(item => {
    Url['mock'][item[0]] = '/mock' + item[1]
})

const isMock = import.meta.env.VITE_APP_BUILD_MODE === 'true'

const requestServerName = isMock ? 'mock' : 'server'

export default {
    GetArticleIndex(params?:any) {
        return request({
            url: Url[requestServerName].articleIndex,
            method: 'get',
            params
        })
    },
    GetArticleDetail(params?:any) {
        return request({
            url: Url[requestServerName].articleDetail,
            method: 'get',
            params
        })
    },
    ArticleAdd(data:any) {
        return request({
            url: Url[requestServerName].articleAdd,
            method: 'post',
            data
        })
    },
    ArticleUpdate(data:any) {
        return request({
            url: Url[requestServerName].articleUpdate,
            method: 'post',
            data
        })
    },
    ArticleDelete(data:any) {
        return request({
            url: Url[requestServerName].articleDelete,
            method: 'post',
            data
        })
    }
}
