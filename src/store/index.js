import {createStore} from "vuex";

import devsModule from "./devsModule";

const store = createStore({
  modules: {
    devs: devsModule
  },
});

export default store;
