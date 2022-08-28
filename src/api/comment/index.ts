/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 04:14:19
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 15:15:18
 * @FilePath: /micro-chat/src/api/article/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'commentAll': '/comment/all',
        'commentAdd': '/comment/add',
        'commentDelete': '/comment/delete',
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
    CommentAll(params?:any) {
        return request({
            url: Url[requestServerName].commentAll,
            method: 'get',
            params
        })
    },
    CommentAdd(data:any) {
        return request({
            url: Url[requestServerName].commentAdd,
            method: 'post',
            data
        })
    },
    CommentDelete(data:any) {
        return request({
            url: Url[requestServerName].commentDelete,
            method: 'post',
            data
        })
    }
}
