export default {
  namespaced: true,

  state() {
    return {
      messages: [
        {
          date: 'Wed Dec 01 2021 09:46:28 GMT+0300 (Москва, стандартное время)',
          developerId: 'c2',
          userEmail: 'test.dev@gmail.com',
          message: 'Чел ты...'
        }
      ],
    };
  },

  getters: {
    getMessages(state) {
      return state.messages;
    },

    getUserMessages(state, getters, rootState, rootGetters) {
      return state.messages.filter(message => message.developerId === rootGetters.getUserId);
    }
  },

  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    }
  },

  actions: {
    addMessage(context, payload) {
      const newMessage = {
        date: new Date().toString(),
        developerId: payload.devId,
        userEmail: payload.email,
        message: payload.message
      };
      context.commit('addMessage', newMessage);
    }
  }
};