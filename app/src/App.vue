<template>
  <div id="app">
    <metainfo :title="title" :description="description" :keywords="keywords" />
    <router-view />
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'

export default {
  setup() {

    useMeta({
      title: 'USE METAAAAAAAAAAAAAAAAA',
      htmlAttrs: { lang: 'en', amp: true },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'My custom description' }
      ],
    })

    return {
      title: 'USE METAAAAAAAAAAAAAAAAA',
      description: 'My custom description',
      keywords: 'vue,js,vuejs,vue-meta,meta,seo'
    }

  }
}
</script>

<style lang="scss"></style>
