import { notify } from "@kyvg/vue3-notification";
import axios from "../plugins/api";
import router from "../router";

export default {
  namespaced: true,

  state() {
    return {
      messages: [],
      loadingStatus: false,
    };
  },

  getters: {
    getMessages(state) {
      return state.messages;
    },

    getUserMessages(state, getters, rootState, rootGetters) {
      return state.messages.filter(message => message.developerId === rootGetters.getUserId);
    },

    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },

  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    },

    setLoadingStatus(state, status) {
      state.loadingStatus = status;
    }
  },

  actions: {
    addMessage(context, payload) {
      const newMessage = {
        date: new Date().toString(),
        userEmail: payload.email,
        message: payload.message
      };

      context.commit('setLoadingStatus', true);
      axios.post(`/messages/${payload.devId}.json`, newMessage)
          .then(response => {
            console.log(response);
            newMessage.id = response.data.name;
            newMessage.developerId = payload.devId;
            router.replace({name: 'Developers'});
          })
          .catch(() => {
            notify({
              type: 'error',
              title: 'Error',
              text: 'Failed to send message! Try again later.',
            });
          })
          .then(() => {
            context.commit('setLoadingStatus', false);
          })

      context.commit('addMessage', newMessage);
    }
  }
};