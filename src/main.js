import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import VueSwal from "vue-sweetalert2";
import VueMoment from "vue-moment";
import VModal from "vue-js-modal";
import wysiwyg from "vue-wysiwyg";
import { ClientTable } from "vue-tables-2";

Vue.use(ClientTable, {}, false, "bootstrap4");

import store from "./store/index";
import axios from "axios";
import router from "./router";

//import './interceptor'
//import './permissions'
import "./validation";

import "vue-material-design-icons/styles.css";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueSwal);
Vue.use(VueMoment);
Vue.use(VModal);
Vue.use(wysiwyg, {});

new Vue({
  el: "#app",
  render: h => h(App),
  store,
  router
});
