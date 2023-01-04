/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-01-04 10:58:56
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-04 12:49:53
 * @FilePath     : /micro-vue/src/views/creativeWork/Variable.ts
 * @Description  : Variable
 * 
 * Copyright (c) 2023 by eug yyh3531@163.com, All Rights Reserved. 
 */
import { computed,  Ref,  ref } from "vue";
// lang
import GfmAr from "bytemd/locales/ar.json";
import GfmCa from "bytemd/locales/ca.json";
import GfmDe from "bytemd/locales/de.json";
import GfmEn from "bytemd/locales/en.json";
import GfmEs from "bytemd/locales/es.json";
import GfmFr from "bytemd/locales/fr.json";
import GfmJa from "bytemd/locales/ja.json";
import GfmKo from "bytemd/locales/ko.json";
import GfmNbNO from "bytemd/locales/nb_NO.json";
import GfmPl from "bytemd/locales/pl.json";
import GfmPtBR from "bytemd/locales/pt_BR.json";
import GfmPt from "bytemd/locales/pt.json";
import GfmRu from "bytemd/locales/ru.json";
import GfmZhHans from "bytemd/locales/zh_Hans.json";
import GfmZhHant from "bytemd/locales/zh_Hant.json";

// local
export enum GfmLocaleEnum {
    ar = 'ar',
    ca = 'ca',
    de = 'de',
    en = 'en',
    es = 'es',
    fr = 'fr',
    ja = 'ja',
    ko = 'ko',
    nb_NO = 'nb_NO',
    pl = 'pl',
    pt_BR = 'pt_BR',
    pt = 'pt',
    ru = 'ru',
    zh_Hans = 'zh_Hans',
    zh_Hant = 'zh_Hant'
}

type GfmLocaleType  = {
    [k in GfmLocaleEnum] : any
}
export const GfmLocale :GfmLocaleType = {
    ar: GfmAr,
    ca: GfmCa,
    de: GfmDe,
    en: GfmEn,
    es: GfmEs,
    fr: GfmFr,
    ja: GfmJa,
    ko: GfmKo,
    nb_NO: GfmNbNO,
    pl: GfmPl,
    pt_BR: GfmPtBR,
    pt: GfmPt,
    ru: GfmRu,
    zh_Hans: GfmZhHans,
    zh_Hant: GfmZhHant
}
export const DefaultGfmLocale: Ref<GfmLocaleEnum> = ref(GfmLocaleEnum.zh_Hans)

export const DefaultGfmLocaleValue = computed(() => {
    return GfmLocale[DefaultGfmLocale.value]
})

// mode
export enum GfmModeEnum {
    split = 'split',
    tab = 'tab',
    auto = 'auto'
}

export const DefaultGfmMode: Ref<GfmModeEnum> = ref(GfmModeEnum.auto)

// value
export const DefaultGfmValue = ref('')

// placeholder
export const DefaultGfmPlaceholder = ref('...')

// maxLength
export const DefaultGfmMaxLength = ref(10)



