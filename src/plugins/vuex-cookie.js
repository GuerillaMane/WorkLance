import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

const vuexCookie = createPersistedState({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, {expires: 1, sameSite: 'strict', secure: true}),
    removeItem: key => Cookies.remove(key)
  },

  reducer(state) {
    return {
      token: state.token,
      refreshToken: state.refreshToken,
      userId: state.userId,
      tokenExpiration: state.tokenExpiration
    }
  }
});

export default vuexCookie;
