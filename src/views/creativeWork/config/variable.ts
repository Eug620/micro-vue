/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-01-04 10:58:56
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-01-05 11:27:26
 * @FilePath     : /micro-vue/src/views/creativeWork/config/variable.ts
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

// mermaid lang
import mermaid_ar from '@bytemd/plugin-mermaid/locales/ar.json'
import mermaid_ca from '@bytemd/plugin-mermaid/locales/ca.json'
import mermaid_de from '@bytemd/plugin-mermaid/locales/de.json'
import mermaid_en from '@bytemd/plugin-mermaid/locales/en.json'
import mermaid_es from '@bytemd/plugin-mermaid/locales/es.json'
import mermaid_fr from '@bytemd/plugin-mermaid/locales/fr.json'
import mermaid_id from '@bytemd/plugin-mermaid/locales/id.json'
import mermaid_nb_NO from '@bytemd/plugin-mermaid/locales/nb_NO.json'
import mermaid_pl from '@bytemd/plugin-mermaid/locales/pl.json'
import mermaid_pt_BR from '@bytemd/plugin-mermaid/locales/pt_BR.json'
import mermaid_ru from '@bytemd/plugin-mermaid/locales/ru.json'
import mermaid_zhHans from '@bytemd/plugin-mermaid/locales/zh_Hans.json'

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


// mermaid local
export enum MermaidLocaleEnum {
    ar = 'ar',
    ca = 'ca',
    de = 'de',
    en = 'en',
    es = 'es',
    fr = 'fr',
    id = 'id',
    nb_NO = 'nb_NO',
    pl = 'pl',
    pt_BR = 'pt_BR',
    ru = 'ru',
    zh_Hans = 'zh_Hans',
}

type MermaidLocaleType  = {
    [k in MermaidLocaleEnum] : any
}
export const MermaidLocale :MermaidLocaleType = {
    ar: mermaid_ar,
    ca: mermaid_ca,
    de: mermaid_de,
    en: mermaid_en,
    es: mermaid_es,
    fr: mermaid_fr,
    id: mermaid_id,
    nb_NO: mermaid_nb_NO,
    pl: mermaid_pl,
    pt_BR: mermaid_pt_BR,
    ru: mermaid_ru,
    zh_Hans: mermaid_zhHans,
}
export const DefaultMermaidLocale: Ref<MermaidLocaleEnum> = ref(MermaidLocaleEnum.zh_Hans)

export const DefaultMermaidLocaleValue = computed(() => {
    return MermaidLocale[DefaultMermaidLocale.value]
})


