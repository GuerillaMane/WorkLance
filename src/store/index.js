import {createStore} from "vuex";
import axios from "../plugins/api";

import devsModule from "./devsModule";
import messagesModule from "./messagesModule";
// import {notify} from "@kyvg/vue3-notification";

const store = createStore({
  modules: {
    devs: devsModule,
    messages: messagesModule
  },

  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    }
  },

  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },

  actions: {
    // login(context, payload) {
    // },

    async signup(context, payload) {
      const requestData = payload;
      requestData.returnSecureToken = true;
      const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_GOOGLE_IDENTITY_API}`,
          requestData
      );

      if (response.data) {
        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.expiresIn
        });
      }
    }
  }
});

export default store;
