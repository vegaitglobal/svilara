import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import VueSwal from "vue-sweetalert2";
import VueMoment from "vue-moment";
import VModal from "vue-js-modal";
import wysiwyg from "vue-wysiwyg";
import { ClientTable } from "vue-tables-2";
import { BulmaAccordion, BulmaAccordionItem } from "vue-bulma-accordion";
import { messages } from "vue-val";

Vue.use(ClientTable, {}, false, "bootstrap4");

import store from "./store/index";
import axios from "axios";
import router from "./router";

import './interceptor'
//import './permissions'
import "./validation";

import "vue-material-design-icons/styles.css";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/admin/login"
      });
    } else next();

  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next({
        path: "/admin"
      });
    } else next();

  }
  else {
    next();
  }
});

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueSwal);
Vue.use(VueMoment);
Vue.use(VModal);
Vue.use(wysiwyg, {});

Vue.component("bulma-accordion", BulmaAccordion);
Vue.component("bulma-accordion-item", BulmaAccordionItem);

messages.required = () => `Polje je obavezno.`;
messages.isDate = () => `Datum mora biti u validnom formatu: dd.mm.yyyy.`;
messages.isTime = () => `Vreme mora biti u validnom formatu: hh:mm`;
messages.isValue = value => `Morate izabrati jednu od sledecih vrednosti: ${value} `;
messages.isUrl = () => `Morate uneti validan URL.`;
messages.isEmail = () => `Morate uneti validnu i-mejl adresu.`;

new Vue({
  el: "#app",
  render: h => h(App),
  store,
  router
});
