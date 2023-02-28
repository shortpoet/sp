import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
// import preview from 'vite-plugin-vue-component-preview';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Markdown from 'vite-plugin-md';
import Shiki from 'markdown-it-shiki';
import LinkAttributes from 'markdown-it-link-attributes';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Inspector from 'vite-plugin-vue-inspector';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // so not just localhost
    host: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variables.scss";`
      }
    }
  },
  build: {
    outDir: 'build'
    // assetsDir: 'assets',
    // sourcemap: true,
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vue: ['vue']
    //     }
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(path.resolve('src'), import.meta.url))
      // '@': path.resolve(__dirname, './src')
    }
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/] // <--
    }),

    // preview(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md']
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core'
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts'
    }),

    // vitePluginRequire({
    //   // @fileRegex RegExp
    //   // optional：default file processing rules are as follows
    //   // fileRegex:/(.jsx?|.tsx?|.vue)$/
    //   // Conversion mode. The default mode is import
    //   // importMetaUrl | import
    //   // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url
    //   // translateType: "importMetaUrl" | "import";
    // })

    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        });
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        });
      }
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')]
    }),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: 'never'
    })
  ]
});
