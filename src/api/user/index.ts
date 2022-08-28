/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 17:15:54
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 04:15:19
 * @FilePath: /micro-base/src/api/menu/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
}
