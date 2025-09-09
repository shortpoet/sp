/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

const paths = [
  {
    path: '/',
    view: 'Landing'
  },
  {
    path: '/resume',
    view: 'Start'
  },
  {
    path: '/about',
    view: 'About'
  },
  {
    path: '/pdf',
    view: 'PDF'
  },
  {
    path: '/articles',
    view: 'Articles',
    props: true,
    // Show article list by default, no redirect
    children: [
      // Dynamic route pattern for all articles
      {
        path: '/articles/:slug-:language',
        name: 'article',
        view: 'ArticleLayouts',
        props: route => ({
          slug: route.params.slug,
          language: route.params.language
        })
      },
      // Legacy routes for backward compatibility
      {
        path: '/articles/learning-to-unit-test-en',
        name: 'learning-to-unit-test-en',
        view: 'ArticleLayouts',
        props: {
          slug: 'learning-to-unit-test',
          language: 'en'
        }
      },
      {
        path: '/articles/learning-to-unit-test-es',
        view: 'ArticleLayouts',
        name: 'learning-to-unit-test-es',
        props: {
          slug: 'learning-to-unit-test',
          language: 'es'
        }
      },
      // New article routes
      {
        path: '/articles/lazlo-exit-journey-1000-miles-en',
        name: 'lazlo-exit-journey-1000-miles-en',
        view: 'ArticleLayouts',
        props: {
          slug: 'lazlo-exit-journey-1000-miles',
          language: 'en'
        }
      },
      {
        path: '/articles/lazlo-exit-journey-1000-miles-es',
        name: 'lazlo-exit-journey-1000-miles-es',
        view: 'ArticleLayouts',
        props: {
          slug: 'lazlo-exit-journey-1000-miles',
          language: 'es'
        }
      }
    ]
  }
];

export default paths;
