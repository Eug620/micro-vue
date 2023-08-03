/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-02-02 14:15:28
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-03 11:40:33
 * @FilePath     : /micro-vue/src/api/han/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import request from '@/plugin/axios'
import { APIENUM } from '@/settings'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'horoscope': '/api/horoscope',
        'visitorInfo': '/api/visitor.info'
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
    Horoscope(params?:any) {
        return request({
            url: Url[requestServerName].horoscope,
            method: 'get',
            params,
            service: APIENUM.HAN
        })
    },
    VisitorInfo(params?:any) {
        return request({
            url: Url[requestServerName].visitorInfo,
            method: 'get',
            params,
            service: APIENUM.HAN
        })
    },
}