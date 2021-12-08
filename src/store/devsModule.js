import { notify } from "@kyvg/vue3-notification";
import axios from "../plugins/api";
import router from "../router";

export default {
  namespaced: true,

  state() {
    return {
      developers: [],
      areas: ['frontend', 'backend', 'design'],
      lastFetch: null,
      loadingStatus: false,
    };
  },

  getters: {
    getDevelopers(state) {
      return state.developers;
    },

    getAreas(state) {
      return state.areas;
    },

    getLoadingStatus(state) {
      return state.loadingStatus;
    },

    isDeveloper(state, getters, rootState, rootGetters) {
      const devs = getters.getDevelopers;
      const userId = rootGetters.getUserId;
      return devs.some(dev => dev.id === userId);
    },

    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTime = new Date().getTime();
      return (currentTime - lastFetch) / 1000 > 60;
    }
  },

  mutations: {
    setDeveloper(state, payload) {
      state.developers.push(payload);
    },

    setDevelopers(state, payload) {
      state.developers = payload;
    },

    setLoadingStatus(state, status) {
      state.loadingStatus = status;
    },

    setLastFetch(state) {
      state.lastFetch = new Date().getTime();
    }
  },

  actions: {
    setDeveloper(context, data) {
      const id = context.rootGetters.getUserId;
      const token = context.rootGetters.getToken;

      context.commit('setLoadingStatus', true);
      axios.put(`developers/${id}.json?auth=${token}`, data)
          .then(() => {
            data.id = id;
            context.commit('setDeveloper', data);
            router.replace({name: 'Developers'});
          })
          .catch(() => {
            notify({
              type: 'error',
              title: 'Error',
              text: 'Failed to register! Try again later.',
            });
          })
          .then(() => {
            context.commit('setLoadingStatus', false);
          })
    },

    async loadDevelopers(context, payload) {
      // dummy response caching; updating only after minute timeout
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await axios.get('developers.json');

      if (response.data) {
        let developers = [];
        for (let id in response.data) {
          let coach = response.data[id];
          coach.id = id;
          developers.push(coach);
        }
        context.commit('setDevelopers', developers);
        context.commit('setLastFetch');
      } else {
        notify({
          type: 'warn',
          title: 'Warning',
          text: 'No devs were found!',
        });
      }
    }
  }
};
