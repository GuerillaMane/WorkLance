export default {
  namespaced: true,

  state() {
    return {
      developers: [
        {
          id: 'c1',
          firstName: 'Kevin',
          lastName: 'Spacey',
          areas: ['frontend', 'design'],
          description:
              "Hey :) I'm Kevin and I've worked as a freelance web developer for years. " +
              "Let me help you with your project!!!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Mia',
          lastName: 'Wallace',
          areas: ['backend', 'frontend'],
          description:
              'I am Mia and as a senior full-stack developer in a big tech company, ' +
              'I can help you get your project done in a couple of days.',
          hourlyRate: 30
        }
      ]
    };
  },

  getters: {
    getDevelopers(state) {
      return state.developers;
    },


  },

  mutations: {},

  actions: {}
};
