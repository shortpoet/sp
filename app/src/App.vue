<template>
  <Head>
    <!-- <html lang="en" dir="ltr" class="mod" style="background-color: ghostwhite;" /> -->
    <!-- <component is="style">
      h1 {
      color: seagreen;
      }
    </component> -->
  </Head>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import { Head } from '@vueuse/head'
export default {
  name: 'App',
  components: {
    Head,
  },
  setup() {
    useHead({
      title: 'Vitesse',
      meta: [
        { name: 'description', content: 'Opinionated Vite Starter Template' },
        {
          name: 'theme-color',
          content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
        },
        {
          rel: 'canonical',
          href: computed(() => window.location.href),
        }
      ],
    })
  },
}
</script>