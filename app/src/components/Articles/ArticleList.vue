<template>
<!-- https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd -->

  <div class="blog-list">
    <ul>
      <li>
        <router-link to="/blog/learning-to-unit-test-en">Learning To Unit Test</router-link>
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    language: String
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<style>

</style>