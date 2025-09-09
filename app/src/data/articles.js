/**
 * Article metadata registry
 * This file contains metadata for all available articles
 */

const articles = [
  {
    slug: 'learning-to-unit-test',
    title: {
      en: 'Learning To Unit Test',
      es: 'Aprendiendo a Hacer Unit Tests'
    },
    description: {
      en: 'A comprehensive guide to unit testing in JavaScript',
      es: 'Una guía completa sobre unit testing en JavaScript'
    },
    date: '2023-01-15',
    languages: ['en', 'es'],
    tags: ['testing', 'javascript', 'development']
  },
  {
    slug: 'lazlo-exit-journey-1000-miles',
    title: {
      en: 'A Journey of a Thousand Miles',
      es: 'Un Viaje de Mil Millas'
    },
    description: {
      en: 'Career transition insights and the excitement of new opportunities',
      es: 'Perspectivas sobre transiciones profesionales y la emoción de nuevas oportunidades'
    },
    date: '2025-01-08',
    languages: ['en', 'es'],
    tags: ['career', 'transition', 'journey']
  }
];

/**
 * Get all articles
 */
export function getAllArticles() {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug) {
  return articles.find(article => article.slug === slug);
}

/**
 * Get articles by language
 */
export function getArticlesByLanguage(language) {
  return articles.filter(article => article.languages.includes(language))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Check if article has translation
 */
export function hasTranslation(slug, language) {
  const article = getArticleBySlug(slug);
  return article && article.languages.includes(language);
}

/**
 * Get available languages for article
 */
export function getAvailableLanguages(slug) {
  const article = getArticleBySlug(slug);
  return article ? article.languages : [];
}

/**
 * Get article component path for dynamic import
 */
export function getArticleComponentPath(slug, language) {
  return `@/components/Articles/Content/${slug}-${language}.md`;
}

export default articles;