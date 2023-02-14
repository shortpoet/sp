import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App.vue'
// import { router } from './router'
import createRouterConfig from './router/createRouterConfig'
import createStore from './store/createStore'


import jquery from 'jquery'

import PortalVue from 'portal-vue'
Vue.use(PortalVue)

require('bootstrap')
require('jquery.easing')

require('bootstrap/dist/css/bootstrap.css')

require('devicons/css/devicons.css')
require('font-awesome/css/font-awesome.css')

// Font Awesome Vue
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faLinkedin, faGithub, faTwitter, faInstagram, faCss3, faJs, faVuejs, faHtml5, faBootstrap, faNodeJs, faLinux, faSass, faNpm, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons'
// import { faTrophy, faCheck, faFlag, faCircle, faFilePdf, faSave, faGlobe, faTimes} from '@fortawesome/free-solid-svg-icons'
import { faCircle, faFilePdf, faSave, faTimes, faRocket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
// import { dom } from '@fortawesome/fontawesome-svg-core'

// dom.watch()

// library.add(
//   faLinkedin, faGithub, faTwitter, faInstagram, faCss3, faJs, faVuejs, 
//   faHtml5, faBootstrap, faNodeJs, faLinux, faSass, faNpm, 
//   faTrophy, faCheck, faFlag, faFontAwesomeFlag, 
//   faCircle, faFilePdf, faSave, faGlobe, faTimes
//   )

library.add(
  faCircle, faFilePdf, faSave, faTimes, faRocket
  )

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.config.devtools = false
Vue.prototype.$ = jquery
Vue.config.productionTip = false

const storeConfig = createStore.createStore()
const routerConfig = createRouterConfig.createRouterConfig()
// console.log(storeConfig)
Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)
Vue.use(VueRouter)
const router = new VueRouter(routerConfig)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
