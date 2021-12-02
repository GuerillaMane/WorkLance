import axios from "../plugins/api";

export default {
  namespaced: true,

  state() {
    return {
      developers: [],
      areas: ['frontend', 'backend', 'design']
    };
  },

  getters: {
    getDevelopers(state) {
      return state.developers;
    },

    getAreas(state) {
      return state.areas;
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
    }
  },

  actions: {
    setDeveloper(context, data) {
      const id = context.rootGetters.getUserId;

      axios.put(`developers/${id}.json`, data)
          .then(response => {
            console.log(response);
            data.id = id;
            context.commit('setDeveloper', data);
          }).catch(error => {
            console.log(error);
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
