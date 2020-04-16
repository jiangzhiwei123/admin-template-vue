import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import actions from "./action";
import mutations from "./mutations.js";

Vue.use(Vuex);

var state = {
  nick: "",
  level: "",
  text: 1
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
  actions
});
