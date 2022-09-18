/*
 * @Author       : Eug
 * @Date         : 2022-03-23 17:01:37
 * @LastEditTime: 2022-09-18 05:31:50
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /github/micro-vue/vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { configCompressPlugin, microCustomPlugin } from './build/vitePlugins'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const path = require('path')
const { resolve } = path
const getEnvFn = (mode, target) => {
  return loadEnv(mode, process.cwd())[target]
}



// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: `${process.env.NODE_ENV === 'production' ? 'http://47.93.229.170:8081/' : '/base/chat/'}`,
  server: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://47.93.229.170:3000',
        // target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/dev_base_api': {
        // target: 'http://127.0.0.1:5000',
        target: 'http://47.93.229.170:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev_base_api/, '')
      }
    }
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_APP_TITLE: getEnvFn(mode, 'VITE_APP_TITLE')
        }
      }
    }),
    microCustomPlugin(),
    // configCompressPlugin('gzip', true)
    Components({
      resolvers: [ArcoResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve:{
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      {
        find: "@vue/runtime-core",
        replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
      },
      {
        find: "vue",
        replacement: resolve(__dirname, 'node_modules/vue'),
      },
    ],
    dedupe: ['vue'],
  },
  build: {
    // rollupOptions: {
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue',
    //     },
    //   },
    // },
    assetsDir: 'assets',
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 brotli 压缩大小报告
    brotliSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 1000,
    // 移除console
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        // drop_console: true,
        // drop_debugger: true,
      },
    },
  },
  css: {
    // [WARNING] "@charset" must be the first rule in the file
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ],
    },
  },
  //调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: 'info',
  //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  // clearScreen: true
  clearScreen: false
})
