/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-01-03 18:15:02
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-03 18:32:03
 * @FilePath     : /micro-vue/src/store/modules/emitter.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import mitt from 'mitt'

export const useMittStore = defineStore({
    id: 'mitt',
    state: () => ({
        mitt: mitt(),
    }),
    getters: {
        emitter():any {
            return this.mitt
        },
    },
})