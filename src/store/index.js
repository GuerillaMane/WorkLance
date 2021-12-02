import {createStore} from "vuex";

import devsModule from "./devsModule";
import messagesModule from "./messagesModule";

const store = createStore({
  modules: {
    devs: devsModule,
    messages: messagesModule
  },

  state() {
    return {
      userId: 'u34w-eb1d',
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
