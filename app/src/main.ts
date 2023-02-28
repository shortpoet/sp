import { ViteSSG } from 'vite-ssg';
import Vuex from 'vuex';
// import Preview from 'vite-plugin-vue-component-preview/client';
import App from './App.vue';
import type { UserModule } from './types';
import PortalVue from 'portal-vue';
import jquery from 'jquery';
import 'devicons/css/devicons.css';
import 'font-awesome/css/font-awesome.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faFilePdf,
  faSave,
  faTimes,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from '@fortawesome/vue-fontawesome';
library.add(faCircle, faFilePdf, faSave, faTimes, faRocket);

import createRouterConfig from './router/createRouterConfig';
import createStore from './stores/createStore';

const storeConfig = createStore.createStore();
const store = new Vuex.Store(storeConfig);

export const createApp = ViteSSG(
  App,
  createRouterConfig.createRouterConfig(),
  async ctx => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>('./modules/*.ts', {
        eager: true
      })
    ).forEach(i => i.install?.(ctx));
    // const { app, router, routes, isClient, initialState } = ctx;
    console.log('Initialising app...');
    // if (import.meta.env.MODE !== 'prod') {
    //   console.log('ctx', ctx);
    //   console.log('app', app);
    //   console.log('router', router);
    //   console.log('routes', routes);
    //   console.log('isClient', isClient);
    //   console.log('initialState', initialState);
    // }
    ctx.app
      .component('font-awesome-icon', FontAwesomeIcon)
      .component('font-awesome-layers', FontAwesomeLayers)
      // .use(Preview)
      .use(store)
      .use(PortalVue);
    // .use(createHead())
    if (ctx.isClient) {
      await import('bootstrap/dist/css/bootstrap.css');
      const bootstrap = await import('bootstrap');
      await import('jquery.easing');
      ctx.app.config.globalProperties.bootstrap = bootstrap;
      ctx.app.config.globalProperties.isClient = true;
    }
    // import.meta.env.SSR
    //   ? null
    //   : import(
    //       'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    //     ).then(bootstrap => {
    //
    //     });
    ctx.app.config.globalProperties.jquery = jquery;
  }
);
