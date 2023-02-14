import paths from '@/router/paths.js'
import {routeMapper} from '@/router/routeMapper'
import {scrollBehavior} from '@/router/scrollBehavior'

const routerConfig = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routeMapper(paths),
  scrollBehavior: scrollBehavior
}

const createRouterConfig = () => {
  return routerConfig
}

export default {
  createRouterConfig
}