import { notify } from "@kyvg/vue3-notification";
import axios from "../plugins/api";
import router from "../router";

export default {
  namespaced: true,

  state() {
    return {
      developers: [],
      areas: ['frontend', 'backend', 'design'],
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
    }
  },

  actions: {
    setDeveloper(context, data) {
      const id = context.rootGetters.getUserId;

      context.commit('setLoadingStatus', true);
      axios.put(`developers/${id}.json`, data)
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

    async loadDevelopers(context) {
      const developers = [];
      const response = await axios.get('developers.json');

      for (let id in response.data) {
        let coach = response.data[id];
        coach.id = id;
        developers.push(coach);
      }

      context.commit('setDevelopers', developers);
    }
  }
};
