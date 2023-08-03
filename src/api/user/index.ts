/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-03 15:16:59
 * @FilePath     : /micro-vue/src/api/user/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'userLogin': '/user/login',
        'userAll': '/user/all',
        'userAdd': '/user/add',
        'userUpdate': '/user/update',
        'userDelete': '/user/delete',
        'userIndex': '/user/index',
        'visitorInfoAdd': '/visitor-info/add',
        'visitorInfoIndex': '/visitor-info/index',
        'visitorInfoAll': '/visitor-info/all'
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
    GetUserAll(params?: any) {
        return request({
            url: Url[requestServerName].userAll,
            method: 'get',
            params
        })
    },
    UserLogin(data?:any) {
        return request({
            url: Url[requestServerName].userLogin,
            method: 'post',
            data
        })
    },
    UserAdd(data?:any) {
        return request({
            url: Url[requestServerName].userAdd,
            method: 'post',
            data
        })
    },
    UserUpdate(data?:any) {
        return request({
            url: Url[requestServerName].userUpdate,
            method: 'post',
            data
        })
    },
    UserDelete(data?:any) {
        return request({
            url: Url[requestServerName].userDelete,
            method: 'post',
            data
        })
    },
    UserIndex(params?: any) {
        return request({
            url: Url[requestServerName].userIndex,
            method: 'get',
            params
        })
    },
    VisitorInfoAdd(data?: any) {
        return request({
            url: Url[requestServerName].visitorInfoAdd,
            method: 'post',
            data
        })
    },
    VisitorInfoIndex(params?: any) {
        return request({
            url: Url[requestServerName].visitorInfoIndex,
            method: 'get',
            params
        })
    },
    VisitorInfoAll(params?: any) {
        return request({
            url: Url[requestServerName].visitorInfoAll,
            method: 'get',
            params
        })
    },
}
