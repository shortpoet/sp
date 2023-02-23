import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
// import vitePluginRequire from 'vite-plugin-require';
import Markdown from 'vite-plugin-md';

import path from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default {
  server: {
    host: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variables.scss";`
      }
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/] // <--
    }),
    Markdown()
    // vitePluginRequire({
    //   // @fileRegex RegExp
    //   // optional：default file processing rules are as follows
    //   // fileRegex:/(.jsx?|.tsx?|.vue)$/
    //   // Conversion mode. The default mode is import
    //   // importMetaUrl | import
    //   // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url
    //   // translateType: "importMetaUrl" | "import";
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(path.resolve('src'), import.meta.url))
    }
  }
};
