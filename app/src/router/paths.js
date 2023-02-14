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
    // until further articles written
    redirect: '/articles/learning-to-unit-test-en',
    children: [
      // {
      //   path: '/blog/:title',
      //   name: 'BlogArticle',
      //   props: (route) => ({ title: route.query.q })
      // },
      {
        path: '/articles/learning-to-unit-test-en',
        name: 'learning-to-unit-test-en',
        props: {
          language: 'en'
        }
      },
      {
        path: '/articles/learning-to-unit-test-es',
        name: 'learning-to-unit-test-es',
        props: {
          language: 'es'
        }
      }
    ]
  }
]

export default paths