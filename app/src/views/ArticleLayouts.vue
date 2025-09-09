<template>
  <!-- https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd -->
  <div class="article-wrapper">
    <nav class="nav">
      <ul class="nav">
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle" data-toggle="dropdown" to="" role="button" aria-haspopup="true"
            aria-expanded="false" data-bs-toggle="dropdown">{{ dropDown }}</router-link>
          <div class="dropdown-menu" v-if="availableLanguages.length > 1">
            <router-link v-for="lang in availableLanguages" :key="lang"
              class="dropdown-item" 
              :to="getArticleRoute(articleSlug, lang)"
              :class="{ active: language === lang }">
              {{ getLanguageLabel(lang) }}
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class="article-container">
      <component :is="selectedArticle" v-if="selectedArticle" />
      <div v-else class="article-not-found">
        <h2>Article not found</h2>
        <p>The requested article could not be loaded.</p>
        <router-link to="/articles" class="btn btn-primary">Back to Articles</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleBySlug, getAvailableLanguages, getArticleComponentPath } from '@/data/articles.js'

export default {
  name: 'ArticleLayout',
  props: {
    language: String,
    slug: String
  },
  data() {
    return {
      selectedArticle: null,
      articleMetadata: null,
      availableLanguages: []
    }
  },
  computed: {
    articleSlug() {
      return this.slug || this.$route.params.slug
    },
    dropDown() { 
      return this.language === 'en' ? 'Languages' : 'Idiomas'
    }
  },
  methods: {
    async loadArticle() {
      if (!this.articleSlug || !this.language) return
      
      try {
        // Get article metadata
        this.articleMetadata = getArticleBySlug(this.articleSlug)
        this.availableLanguages = getAvailableLanguages(this.articleSlug)
        
        if (!this.articleMetadata) {
          console.error(`Article not found: ${this.articleSlug}`)
          return
        }
        
        // Check if the requested language is available
        if (!this.availableLanguages.includes(this.language)) {
          console.error(`Language '${this.language}' not available for article '${this.articleSlug}'`)
          return
        }
        
        // Dynamically import the article component
        const componentPath = getArticleComponentPath(this.articleSlug, this.language)
        const module = await import(/* @vite-ignore */ componentPath)
        this.selectedArticle = module.default
        
      } catch (error) {
        console.error(`Error loading article: ${this.articleSlug}-${this.language}`, error)
        this.selectedArticle = null
      }
    },
    getArticleRoute(slug, lang) {
      return `/articles/${slug}-${lang}`
    },
    getLanguageLabel(lang) {
      const labels = {
        en: this.language === 'en' ? 'English' : 'Inglés',
        es: this.language === 'en' ? 'Spanish' : 'Español'
      }
      return labels[lang] || lang.toUpperCase()
    }
  },
  watch: {
    articleSlug: {
      immediate: true,
      handler() {
        this.loadArticle()
      }
    },
    language: {
      immediate: true,
      handler() {
        this.loadArticle()
      }
    }
  },
  mounted() {
    this.loadArticle()
  }
}
</script>

<style>

</style>
