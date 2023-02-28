import { ViteSSG } from 'vite-ssg';
import Vuex from 'vuex';
// import Preview from 'vite-plugin-vue-component-preview/client';

import App from './App.vue';
// import router from './router';
import createStore from './stores/createStore';
import type { UserModule } from './types';

import jquery from 'jquery';

import PortalVue from 'portal-vue';

// import { createHead } from '@vueuse/head';

// require("bootstrap");
// import * as bootstrap from 'bootstrap';
// require("jquery.easing");
// import 'jquery.easing';

// require("bootstrap/dist/css/bootstrap.css");
// import 'bootstrap/dist/css/bootstrap.css';

// require("devicons/css/devicons.css");
import 'devicons/css/devicons.css';
// require("font-awesome/css/font-awesome.css");
import 'font-awesome/css/font-awesome.css';

// Font Awesome Vue
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faLinkedin, faGithub, faTwitter, faInstagram, faCss3, faJs, faVuejs, faHtml5, faBootstrap, faNodeJs, faLinux, faSass, faNpm, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons'
// import { faTrophy, faCheck, faFlag, faCircle, faFilePdf, faSave, faGlobe, faTimes} from '@fortawesome/free-solid-svg-icons'
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
import createRouterConfig from './router/createRouterConfig';
// import { dom } from '@fortawesome/fontawesome-svg-core'

// dom.watch()

// library.add(
//   faLinkedin, faGithub, faTwitter, faInstagram, faCss3, faJs, faVuejs,
//   faHtml5, faBootstrap, faNodeJs, faLinux, faSass, faNpm,
//   faTrophy, faCheck, faFlag, faFontAwesomeFlag,
//   faCircle, faFilePdf, faSave, faGlobe, faTimes
//   )

library.add(faCircle, faFilePdf, faSave, faTimes, faRocket);

const storeConfig = createStore.createStore();
// console.log(storeConfig)
const store = new Vuex.Store(storeConfig);

export const createApp = ViteSSG(
  App,
  createRouterConfig.createRouterConfig(),
  ctx => {
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
    // import.meta.env.SSR
    //   ? null
    //   : import(
    //       'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    //     ).then(bootstrap => {
    //       ctx.app.config.globalProperties.bootstrap = bootstrap;
    //     });
    ctx.app.config.globalProperties.jquery = jquery;
  }
);

// const app = createApp(App);

// app.use(createHead());
// app.component('font-awesome-icon', FontAwesomeIcon);
// app.component('font-awesome-layers', FontAwesomeLayers);

// app.config.globalProperties.bootstrap = bootstrap;
// app.config.globalProperties.jquery = jquery;

// app.use(store);
// app.use(router);
// app.use(PortalVue);
// app.mount('#app');

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
