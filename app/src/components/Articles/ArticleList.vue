<template>
  <!-- https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd -->
  <div class="article-list">
    <h2>{{ $t('articles.title') || 'Articles' }}</h2>
    <div class="articles-grid">
      <article v-for="article in articles" :key="article.slug" class="article-card">
        <div class="article-meta">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <h3 class="article-title">
          <router-link :to="getArticleRoute(article.slug, preferredLanguage(article))"
            >{{ getArticleTitle(article) }}</router-link
          >
        </h3>
        <p class="article-description">{{ getArticleDescription(article) }}</p>
        <div class="article-languages">
          <router-link v-for="lang in article.languages" :key="lang"
            :to="getArticleRoute(article.slug, lang)"
            class="language-link"
            :class="{ preferred: lang === preferredLanguage(article) }">
            {{ getLanguageLabel(lang) }}
          </router-link>
        </div>
      </article>
    </div>
    <div v-if="articles.length === 0" class="no-articles">
      <p>No articles available.</p>
    </div>
  </div>
</template>

<script>
import { getAllArticles } from '@/data/articles.js'

export default {
  name: 'ArticleList',
  props: {
    language: String
  },
  data() {
    return {
      articles: []
    }
  },
  computed: {
    currentLanguage() {
      return this.language || this.$i18n?.locale || 'en'
    }
  },
  methods: {
    loadArticles() {
      this.articles = getAllArticles()
    },
    getArticleRoute(slug, lang) {
      return `/articles/${slug}-${lang}`
    },
    getArticleTitle(article) {
      return article.title[this.currentLanguage] || article.title.en || article.slug
    },
    getArticleDescription(article) {
      return article.description[this.currentLanguage] || article.description.en || ''
    },
    getLanguageLabel(lang) {
      const labels = {
        en: this.currentLanguage === 'en' ? 'English' : 'Inglés',
        es: this.currentLanguage === 'en' ? 'Spanish' : 'Español'
      }
      return labels[lang] || lang.toUpperCase()
    },
    preferredLanguage(article) {
      // Return current language if available, otherwise fallback to first available
      return article.languages.includes(this.currentLanguage) 
        ? this.currentLanguage 
        : article.languages[0]
    },
    formatDate(dateString) {
      try {
        return new Date(dateString).toLocaleDateString(this.currentLanguage === 'es' ? 'es-ES' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch {
        return dateString
      }
    }
  },
  mounted() {
    this.loadArticles()
  }
}
</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.article-list h2 {
  margin-bottom: 2rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.articles-grid {
  display: grid;
  gap: 2rem;
}

.article-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.article-title {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.article-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.article-title a:hover {
  color: #007bff;
}

.article-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-languages {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.article-languages::before {
  content: 'Available in:';
  font-size: 0.9rem;
  color: #888;
  margin-right: 0.5rem;
}

.language-link {
  padding: 0.3rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.language-link:hover {
  background: #f8f9fa;
  color: #007bff;
  text-decoration: none;
}

.language-link.preferred {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .article-list {
    padding: 1rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .article-languages {
    flex-wrap: wrap;
  }
  
  .article-languages::before {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
