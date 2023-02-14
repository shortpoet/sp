import { createApp } from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import router from "./router";
import createStore from "./store/createStore";

import jquery from "jquery";

import PortalVue from "portal-vue";

// require("bootstrap");
import * as bootstrap from "bootstrap";
// require("jquery.easing");
import "jquery.easing";

// require("bootstrap/dist/css/bootstrap.css");
import "bootstrap/dist/css/bootstrap.css";

// require("devicons/css/devicons.css");
import "devicons/css/devicons.css";
// require("font-awesome/css/font-awesome.css");
import "font-awesome/css/font-awesome.css";

// Font Awesome Vue
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faLinkedin, faGithub, faTwitter, faInstagram, faCss3, faJs, faVuejs, faHtml5, faBootstrap, faNodeJs, faLinux, faSass, faNpm, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons'
// import { faTrophy, faCheck, faFlag, faCircle, faFilePdf, faSave, faGlobe, faTimes} from '@fortawesome/free-solid-svg-icons'
import {
  faCircle,
  faFilePdf,
  faSave,
  faTimes,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
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
const app = createApp(App);

const store = new Vuex.Store(storeConfig);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("font-awesome-layers", FontAwesomeLayers);

app.config.devtools = false;
app.config.globalProperties.bootstrap = bootstrap;
app.config.productionTip = false;

app.use(store);
app.use(router);
app.use(PortalVue);
app.mount("#app");

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
