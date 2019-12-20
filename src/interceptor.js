import axios from "axios";
import router from "./router";
import store from "./store/index";

axios.interceptors.request.use(
  function(config) {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
        return Promise.reject(err);
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response){
      if (parseInt(error.response.status) == 401) {
        store.dispatch("logout");
        router.push("/admin/login");
      }
    }
    return Promise.reject(error);
  }
);
