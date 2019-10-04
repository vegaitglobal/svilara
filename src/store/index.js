
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      auth: auth,
  },
  plugins: [vuexLocal.plugin]
});
