import axios from "axios";
import * as _ from "lodash";

export default {
  state: {
    user: {},
    token: localStorage.getItem("token") || ""
  },

  getters: {
    isLoggedIn: state => {
      return !_.isEmpty(state.token);
    },

    user: state => {
      return state.user;
    },

    isAdmin: state => {
      return state.user.role === "admin";
    }
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },

    REMOVE_USER(state) {
      state.user = {};
    },

    REMOVE_TOKEN(state) {
      state.token = "";
    }
  },

  actions: {
    login({ commit }, { email, password }) {
      if (email) email = email.trim();
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/auth/login`, {
            email: email,
            password: password
          })
          .then(response => {
            commit("SET_TOKEN", response.data.token);
            window.localStorage.setItem('token', response.data.token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    forgot({ commit }, { email }) {
      if (email) email = email.trim();
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/auth/forgot`, {
            email: email,
          })
          .then(response => {
            //commit('SET_USER', response.data.user);
            commit("SET_TOKEN", response.data.token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
        try {
        commit("REMOVE_TOKEN");
        localStorage.removeItem('token');
        resolve();
        } catch (err) {
        reject(err);
        }
        });
    },

    resetPassword({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `${process.env.VUE_APP_API_BASE_URL}/auth/reset-password/`,
            {
              password: data.password,
              password_confirmation: data.password_confirmation,
              old_password: data.old_password
            }
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    resetForgotPassword({ commit }, data) {  //only reset function that is used

      return new Promise((resolve, reject) => {
        axios
          .put(
            `${process.env.VUE_APP_BASE_URL}/auth/reset-password/${data.userId}/${data.token}`,
            {
              password: data.password,
              password_confirmation: data.password_confirmation,
            }
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    updateProfile({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .put(`${process.env.VUE_APP_API_BASE_URL}/auth/`, user)
          .then(response => {
            commit("SET_USER", response.data.user);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    checkToken({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_BASE_URL}/auth/check/`, {
            withCredentials: true
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            commit("REMOVE_USER");
            commit("REMOVE_TOKEN");
            reject(error);
          });
      });
    },

    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_BASE_URL}/auth/get-user`)
          .then(response => {
            commit("SET_USER", response.data.user);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    getUserById({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_BASE_URL}/auth/users/${id}`)
          .then(response => {
            resolve(response.data.user);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    listUsers({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_BASE_URL}/auth/users/list`, {
            withCredentials: true
          })
          .then(response => {
            commit("SET_USERS", response.data.users);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    resetPasswordEmail({ commit }, email) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_API_BASE_URL}/users/send-reset-email`, {
            email: email
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    resetPasswordJWT({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.VUE_APP_API_BASE_URL}/users/password-reset/${data.token}`,
            {
              email: data.email,
              password: data.password,
              password_confirmation: data.password_confirmation
            }
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
