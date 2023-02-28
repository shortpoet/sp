import paths from '@/router/paths.js';
import { routeMapper } from '@/router/routeMapper';
import { scrollBehavior } from '@/router/scrollBehavior';
import { createMemoryHistory, createWebHistory } from 'vue-router';

const routerConfig = {
  mode: 'history',
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes: routeMapper(paths),
  scrollBehavior: scrollBehavior
};

const createRouterConfig = () => {
  return routerConfig;
};

export default {
  createRouterConfig
};
