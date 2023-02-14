// https://github.com/quasarframework/quasar/issues/1466
// https://stackoverflow.com/questions/42538449/vue-js-scroll-to-top-of-new-page-route-after-settimeout
export const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { selector: to.hash }
  }
  return { x: 0, y: 0 }
}
