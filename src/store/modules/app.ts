/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-26 22:22:40
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-27 03:09:09
 * @FilePath: /micro-base/src/store/system/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
    lang: ''
  }),
  getters: {
    getTheme(store) {
      return store.theme
    }
  },
  actions: {
    reload() {
      const db = useDBStore()
      const defaultConfig = db.get({ dbName: DataBaseName.SYSTEM, defaultValue: {} })
      this.setTheme(defaultConfig?.theme)
      this.setLang(defaultConfig?.lang)

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
    }
  },
});
