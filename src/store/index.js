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
      userId: '9dc2-040f',
      // userId: 'q29a-bc1l',
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
