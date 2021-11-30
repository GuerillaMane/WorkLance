import {createStore} from "vuex";

import devsModule from "./devsModule";

const store = createStore({
  modules: {
    devs: devsModule
  },

  state() {
    return {
      userId: '123'
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
