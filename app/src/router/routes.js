/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

const routes = [
  {
    path: '/blog',
    name: 'Blog',
    component: resolve => import(`@/views/Blog.vue`).then(resolve),
    children: [
      // {
      //   path: '/blog/learning-to-unit-test-en',
      //   name: 'learning-to-unit-test-en',
      //   component: resolve => import(`@/components/Blog/BlogArticle.vue`).then(resolve),
      //   props: {
      //     language: 'english'
      //   }
      // },
      // {
      //   path: '/blog/learning-to-unit-test-es',
      //   name: 'learning-to-unit-test-es',
      //   component: resolve => import(`@/components/Blog/BlogArticle.vue`).then(resolve),
      //   props: {
      //     language: 'spanish'
      //   }
      // }
    ]
  },
  {
    path: '/blog/:title',
    name: 'BlogArticle',
    props: (route) => ({ title: route.query.q })
  },

]

export default routes