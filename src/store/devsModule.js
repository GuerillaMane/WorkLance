export default {
  namespaced: true,

  state() {
    return {
      developers: [
        {
          id: 'c1',
          firstname: 'Kevin',
          lastname: 'Spacey',
          areas: ['frontend', 'design'],
          description:
              "Hey :) I'm Kevin and I've worked as a freelance web developer for years. " +
              "Let me help you with your project!!!",
          rate: 30
        },
        {
          id: 'c2',
          firstname: 'Mia',
          lastname: 'Wallace',
          areas: ['backend', 'frontend'],
          description:
              'I am Mia and as a senior full-stack developer in a big tech company, ' +
              'I can help you get your project done in a couple of days.',
          rate: 30
        }
      ],

      areas: ['frontend', 'backend', 'design']
    };
  },

  getters: {
    getDevelopers(state) {
      return state.developers;
    },

    getAreas(state) {
      return state.areas;
    }
  },

  mutations: {},

  actions: {}
};
