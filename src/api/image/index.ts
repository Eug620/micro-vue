/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-02-16 14:56:19
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-10 16:48:16
 * @FilePath     : /micro-vue/src/api/image/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'imageAll': '/image/all',
        'imageAdd': '/image/add',
        'imageDelete': '/image/delete',
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
    GetImageAll(params?:any) {
        return request({
            url: Url[requestServerName].imageAll,
            method: 'get',
            params
        })
    },
    AddImage(data?:any) {
        return request({
            url: Url[requestServerName].imageAdd,
            method: 'post',
            data
        })
    },
    DeleteImage(data?:any) {
        return request({
            url: Url[requestServerName].imageDelete,
            method: 'post',
            data
        })
    },
    
}
