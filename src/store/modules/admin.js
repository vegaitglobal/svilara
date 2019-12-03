import axios from "axios";
import * as _ from "lodash";

export default {
    state: {
        settings: []
    },

    getters: {
        getSettings(state) {
            return state.settings;
        },
    },

    mutations: {
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },
    },

    actions: {
        async fetchSettings({ commit }) {
            console.log("usao u fetch")
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BASE_URL}/admin/settings`)
                .then(response => {
                    console.log(response);
                    var favicon = document.getElementById('favicon');
                    var title = document.getElementById('title');
                    favicon.href = process.env.VUE_APP_MEDIA_BASE_URL + "/" + response.data.data[12].value;
                    title.innerText = response.data.data[13].value;
                    // console.log(response.data.data[13].value);
                    // console.log('fetchSettings ' + response.data.data[12].value);
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
                .then((res) => {
                    console.log(res);
                    dispatch('fetchSettings');
                    resolve()
                })
                .catch((error) => reject(error))
            })
            // try{  const res = await axios.put(`${process.env.VUE_APP_BASE_URL}/admin/setting/${formIdObject.id}`, formIdObject.form);
            //     console.log('uspeo update')
            //     dispatch('fetchSettings');
            //     return res
            // } catch (err) {
            //     return err
            // }
        },
       
        async acceptEvent({ commit }, id) {
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
        async rejectEvent({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.put(`${process.env.VUE_APP_BASE_URL}/admin/event/reject/${id}`)
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