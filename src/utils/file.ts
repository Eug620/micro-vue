/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-07-10 17:02:16
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-07-10 17:02:32
 * @FilePath     : /micro-vue/src/utils/file.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// url转base64
export function imgUrlToBase64(url: string, callback: Function, errorFunc: Function) {
    let img = new Image;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    img.crossOrigin = 'anonymous';//也需要后端的支持
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        (ctx as CanvasRenderingContext2D).drawImage(img, 0, 0);
        callback(canvas.toDataURL());
    }
    // 图片获取失败 - 自动删除并获取新图片
    img.onerror = () => {
        errorFunc()
    }
    img.src = url;
}