
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth'
import event from './modules/event'
import admin from './modules/admin'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      auth: auth,
      event: event,
      admin: admin
  },
  plugins: [vuexLocal.plugin]
});
