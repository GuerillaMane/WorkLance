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

    getUserMessages(state) {
      return state.messages;
      // return state.messages.filter(message => message.developerId === rootGetters.getUserId);
    },

    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },

  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    },

    addMessages(state, payload) {
      state.messages = payload;
    },

    setLoadingStatus(state, status) {
      state.loadingStatus = status;
    }
  },

  actions: {
    async getMessages(context) {
      const currentDev = context.rootGetters.getUserId;
      const response = await axios.get(`messages/${currentDev}.json`);

      if (response.data) {
        let messages = [];
        for (let id in response.data) {
          let message = response.data[id];
          message.id = id;
          messages.push(message);
        }
        context.commit('addMessages', messages);
      } else {
        notify({
          type: 'warn',
          title: 'Warning',
          text: 'You have no messages! :(',
        });
      }
    },

    addMessage(context, payload) {
      const newMessage = {
        date: new Date().toString(),
        userEmail: payload.email,
        message: payload.message
      };

      context.commit('setLoadingStatus', true);
      axios.post(`/messages/${payload.devId}.json`, newMessage)
          .then(response => {
            newMessage.id = response.data.name;
            newMessage.developerId = payload.devId;
            router.replace({name: 'Developers'});
            notify({
              type: 'info',
              title: 'Yay!',
              text: 'The message was sent successfully!',
            });
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
          });

      context.commit('addMessage', newMessage);
    }
  }
};