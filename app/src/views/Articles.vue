<template>
  <div class="articleS-wrapper">
    <ArticleNav />
    <div class="articleS-container">
      <ArticleList v-if="articleRoot" />
      <router-view v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  computed: {
    articleRoot() {
      return this.$route.path === '/articles'
    }
  },
  mounted() {
    // this.$forceUpdate()
  }
}
</script>

<style lang="scss">
@import './../assets/scss/articles.scss';
</style>
