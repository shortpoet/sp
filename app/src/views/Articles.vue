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
import ArticleNav from '@/components/Articles/ArticleNav.vue'
import ArticleList from '@/components/Articles/ArticleList.vue'

export default {
  name: 'Articles',
  components: {
    ArticleNav,
    ArticleList
  },
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