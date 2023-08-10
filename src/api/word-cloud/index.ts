/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-08-10 17:53:39
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-10 17:54:07
 * @FilePath     : /micro-vue/src/api/word-cloud/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'wordCloudAllByMonth': '/word-cloud/allByMonth',
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
    GetWordCloudAllByMonth(params?:any) {
        return request({
            url: Url[requestServerName].wordCloudAllByMonth,
            method: 'get',
            params
        })
    },
}
