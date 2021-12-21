import {createStore} from "vuex";
import axios from "../plugins/api";
import router from "../router";

import devsModule from "./devsModule";
import messagesModule from "./messagesModule";

import vuexCookie from "../plugins/vuex-cookie";
import {notify} from "@kyvg/vue3-notification";

const store = createStore({
  modules: {
    devs: devsModule,
    messages: messagesModule
  },

  plugins: [vuexCookie],

  state() {
    return {
      userId: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    },

    getToken(state) {
      return state.token;
    },

    getRefreshToken(state) {
      return state.refreshToken;
    }
  },

  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },

  actions: {
    async login(context, payload) {
      const requestData = payload;
      requestData.returnSecureToken = true;
      const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_GOOGLE_IDENTITY_API}`,
          requestData
      );

      if (response.data) {
        context.commit('setUser', {
          userId: response.data.localId,
          token: response.data.idToken,
          refreshToken: response.data.refreshToken,
          tokenExpiration: response.data.expiresIn
        });
        router.replace({name: 'Developers'});
      }
    },

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
          refreshToken: response.data.refreshToken,
          tokenExpiration: response.data.expiresIn
        });
        router.replace({name: 'Developers'});
      }
    },

    logout({commit}) {
      commit('setUser', {
        userId: null,
        token: null,
        refreshToken: null,
        tokenExpiration: null
      });
      router.replace({name: 'Login'});
    },

    async refreshToken(context) {
      const refreshToken = context.getters['getRefreshToken'];

      if (refreshToken) {
        const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_GOOGLE_IDENTITY_API}`;

        let params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        const response = await axios.post(url, params, config);

        if (response.data) {
          context.commit('setUser', {
            userId: response.data.user_id,
            token: response.data.access_token,
            refreshToken: response.data.refresh_token,
            tokenExpiration: response.data.expires_in
          });
          notify({
            type: 'success',
            title: 'Success!',
            text: 'Access token was successfully updated!'
          });
        }
      } else {
        notify({
          type: 'error',
          title: 'Error',
          text: 'Refresh token was not found! Access token cannot be updated!'
        });
      }
    }
  }
});

export default store;
