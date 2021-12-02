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
      userId: 'd34b-eb0d',
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
