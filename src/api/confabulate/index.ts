/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-18 05:47:42
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-01 15:57:17
 * @FilePath     : /micro-vue/src/api/confabulate/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'

const Url:any = {
    'server': {
        'roomsAll': '/rooms/all',
        'roomsCreate': '/rooms/create',
        'roomsUpdate': '/rooms/update',
        'roomsDelete': '/rooms/delete',
        'roomsJoin': '/rooms/join',
        'roomsDeleteUser': '/rooms/deleteUser',
        'roomsOwnRoom': '/rooms/ownRoom',
        'roomsRecords': '/rooms/records',
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
    RoomsAll(params?:any) {
        return request({
            url: Url[requestServerName].roomsAll,
            method: 'get',
            params
        })
    },
    RoomsCreate(data:any) {
        return request({
            url: Url[requestServerName].roomsCreate,
            method: 'post',
            data
        })
    },
    RoomsUpdate(data:any) {
        return request({
            url: Url[requestServerName].roomsUpdate,
            method: 'post',
            data
        })
    },
    RoomsDelete(data:any) {
        return request({
            url: Url[requestServerName].roomsDelete,
            method: 'post',
            data
        })
    },
    RoomsJoin(data:any) {
        return request({
            url: Url[requestServerName].roomsJoin,
            method: 'post',
            data
        })
    },
    RoomsDeleteUser(data:any) {
        return request({
            url: Url[requestServerName].roomsDeleteUser,
            method: 'post',
            data
        })
    },
    RoomsOwnRoom(params?:any) {
        return request({
            url: Url[requestServerName].roomsOwnRoom,
            method: 'get',
            params
        })
    },
    RoomsRecords(params?:any) {
        return request({
            url: Url[requestServerName].roomsRecords,
            method: 'get',
            params
        })
    },
}
