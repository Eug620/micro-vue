import { type } from "os"

/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-08-31 15:08:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-02-02 14:36:21
 * @FilePath     : /micro-vue/src/settings/index.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
interface InterAPISERVICEENUM  {
    [key: string]: any
}
export enum APIENUM {
    BASE = 'base',
    HAN = 'han'
}

type InterAPISERVICEENUMS = {
    [k in APIENUM]: string | undefined
}

export const API_ENUM_SERVICE: InterAPISERVICEENUMS = {
    base: import.meta.env.VITE_APP_BASE_API,
    han: import.meta.env.VITE_APP_HAN_API,
}
export const API_SERVICE_ENUM: InterAPISERVICEENUM = {
    base: import.meta.env.VITE_APP_BASE_API,
    han: import.meta.env.VITE_APP_HAN_API,
}