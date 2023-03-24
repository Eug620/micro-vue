/*
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2023-02-18 17:16:30
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2023-03-24 21:34:37
 * @FilePath     : \micro-vue\src\store\modules\app.ts
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { LangEnum, ThemeEnum } from '@/enums/system';
import { defineStore } from 'pinia';
import i18n from '@/locales/i18n';
import { useDBStore } from '@/store/modules/db'
import { DataBaseName, DATABASEPUBLIC } from '@/enums/database';

export const useSystemStore = defineStore({
  id: 'app',
  state: () => ({
    // 主题
    theme: '',
    // 语言
    lang: '',
    // 首页图片
    background: ''
  }),
  getters: {
    getTheme(store) {
      return store.theme
    },
    getDashboardBackground(store) {
      return store.background
    }
  },
  actions: {
    reload() {
      const db = useDBStore()
      const defaultConfig = db.get({ dbName: DataBaseName.SYSTEM, defaultValue: {} })
      this.setTheme(defaultConfig?.theme)
      this.setLang(defaultConfig?.lang)
      this.setDashboardBackground(defaultConfig?.background)
    },
    setTheme(theme: ThemeEnum = ThemeEnum.DARK) {
      const db = useDBStore()
      this.theme = theme
      document.body.setAttribute('arco-theme', theme);
      db.set({ dbName: DataBaseName.SYSTEM, path: DATABASEPUBLIC.THEME, value: theme })
    },
    setLang(lang: LangEnum = LangEnum.ZH) {
      const db = useDBStore()
      this.lang = lang
      i18n.global.locale = lang
      db.set({ dbName: DataBaseName.SYSTEM, path: DATABASEPUBLIC.LANG, value: lang })
    },
    setDashboardBackground(url: string = 'https://momentum.photos/img/b286b86e-0a7f-46fb-9bcb-f526a24b40eb.jpg?momo_cache_bg_uuid=c2110704-2468-47e6-a05b-09856ed3d5a9') {
      const db = useDBStore()
      this.background = url
      db.set({ dbName: DataBaseName.SYSTEM, path: DATABASEPUBLIC.BACKGROUND, value: url })
    }
  },
});
