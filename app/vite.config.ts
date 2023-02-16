import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
// import vitePluginRequire from 'vite-plugin-require';
import Markdown from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
