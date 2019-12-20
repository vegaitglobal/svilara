import axios from "axios";
import * as _ from "lodash";

export default {
    state: {
        settings: []
    },

    getters: {
        getSettings(state) {
            return () => state.settings;
        },
    },

    mutations: {
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },
    },

    actions: {
        async fetchSettings({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BASE_URL}/admin/settings`)
                .then(response => {
                    var favicon = document.getElementById('favicon');
                    var title = document.getElementById('title');
                    favicon.href = process.env.VUE_APP_MEDIA_BASE_URL + "/" + response.data.data[12].value;
                    title.innerText = response.data.data[13].value;
                    commit("SET_SETTINGS", response.data.data);
                    resolve(response)})
                .catch(error => {
                    reject(error);
                })
            })
        },

        async updateSettings({ dispatch }, formIdObject) {
            return new Promise((resolve, reject) => {
                axios.put(`${process.env.VUE_APP_BASE_URL}/admin/setting/${formIdObject.id}`, formIdObject.form)
                .then(() => {
                    dispatch('fetchSettings');
                    resolve()
                })
                .catch((error) => reject(error))
            })

        },

        async addSetting({ dispatch }, newSetting) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BASE_URL}/admin/setting`, newSetting)
                .then(() => {
                    dispatch('fetchSettings');
                    resolve()
                })
                .catch((error) => reject(error))
            })
        },

        async deleteSettingsOption({ dispatch }, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`${process.env.VUE_APP_BASE_URL}/admin/setting/${id}`)
                .then(() => {
                    dispatch('fetchSettings');
                    resolve()
                })
                .catch((error) => reject(error))
            })

        },

        async acceptEvent(id) {
            return new Promise((resolve, reject) => {
                axios.put(`${process.env.VUE_APP_BASE_URL}/admin/event/accept/${id}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        async rejectEvent(id) {
            return new Promise((resolve, reject) => {
                axios.put(`${process.env.VUE_APP_BASE_URL}/admin/event/reject/${id}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        async addEvent(form) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BASE_URL}/admin/event`,
                form)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
}