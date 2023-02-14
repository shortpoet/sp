<template>
<!-- https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd -->
<div class="article-wrapper">
  <nav class="nav">
    <ul class="nav">
      <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle" data-toggle="dropdown" to="" role="button" aria-haspopup="true" aria-expanded="false">{{ dropDown }}</router-link>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/articles/learning-to-unit-test-en">{{ englishLink }}</router-link>
            <router-link class="dropdown-item" to="/articles/learning-to-unit-test-es">{{ spanishLink }}</router-link>
          </div>
        </li>      
    </ul>
  </nav>
  <div class="article-container">
    <component :is="selectedArticle" />
  </div>
</div>
  
</template>

<script>
export default {
  name: 'ArticleLayout',
  props: {
    language: String
  },
  computed: {
    // incorrect
    // selectedArticle: () => import('./../../components/Blog/Articles/')
    // correct
    selectedArticle: function () {
      const english = () => import(`./../../components/Articles/Content/learning-to-unit-test-en.md`)
      const spanish = () => import(`./../../components/Articles/Content/learning-to-unit-test-es.md`)
      return this.language === 'en' ? english : spanish
    },
    dropDown() { return this.language === `en` ? `Languages` : `Idiomas` },
    englishLink() {return this.language === `en` ? `English` : `Inglés`},
    spanishLink() {return this.language === `en` ? `Spanish` : `Español`}
  },
  mounted() {
    // possible future option 
    // https://stackoverflow.com/questions/50053556/dynamic-imported-vue-component-failed-to-resolve
    // https://stackoverflow.com/questions/53630683/webpack-dependency-management-and-vue-js-async-component-loading
  }
}
</script>

<style>

</style>