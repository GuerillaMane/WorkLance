import axios from "../plugins/api";
import {notify} from "@kyvg/vue3-notification";

const setup = (store) => {
  // TODO (maybe): add request interceptor to apply token on certain requests..

  /*  catching all [401 Unauthorized] responses;
     taking the first request, that responded  with 401, while pushing others to failedQueue;
     trying to refresh token and apply new bearer, then return original request with new token;
     after that resolve all failedQueue requests;

     if we get 401 on refreshToken request -> pushing user to login menu;
  */

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    })

    failedQueue = [];
  }


  axios.interceptors.response.use(
      response => response,
      error => {
        const originalRequest = error.config;

        // TODO: add rejected url (token refresh)
        const rejectedUrl = '?';

        if (error.response.status === 401 && originalRequest.url === rejectedUrl) {
          notify({
            type: 'error',
            title: 'Error',
            text: 'You\'re not authorized!'
          });
          store.dispatch('logout');
          return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({resolve, reject});
            }).then(token => {
              // TODO: We are applying token as ?auth=${token} !!!
              // -------------------------------------------------
              // originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axios(originalRequest);
            }).catch(error => {
              return Promise.reject(error);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const token = store.getters['getToken'];

          if (token) {
            return new Promise((resolve, reject) => {
              store.dispatch('refreshToken')
                  .then(() => {
                    // TODO: We are applying token as ?auth=${token} !!!
                    // -------------------------------------------------
                    // originalRequest.headers['Authorization'] = `Bearer ${updatedToken}`;
                    const updatedToken = store.getters['getToken'];
                    processQueue(null, updatedToken);
                    resolve(axios(originalRequest));
                  })
                  .catch(error => {
                    notify({
                      type: 'error',
                      title: 'Error',
                      text: 'An error occurred while updating access token!'
                    });
                    processQueue(error, null);
                    reject(error);
                  })
                  .finally(() => {
                    isRefreshing = false;
                  });
            });
          }
        }

        return Promise.reject(error);
      }
  );
};

export default setup;
