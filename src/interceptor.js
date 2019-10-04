import axios from 'axios'
import router from './router'

axios.interceptors.request.use(function (config) {
    try {
        let token = JSON.parse(localStorage.getItem('vuex')).auth.token;

        config.headers.Authorization = `Bearer ${ token }`;
    } catch (err) {}

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.error === 'No credentials sent.' || response.data.message == 'Access token has expired.') {
        localStorage.removeItem('vuex');
        router.push(`/login?info_message=Your session has expired.`)
    }
    return response;
}, function (error) {
    if (error.response.data.message === 'Access token has expired.') {
        localStorage.removeItem('vuex');
        router.push(`/login?info_message=Your session has expired.`)
    }
    return Promise.reject(error);
});