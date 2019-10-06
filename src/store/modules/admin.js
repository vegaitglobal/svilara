import axios from "axios";
import * as _ from "lodash";
import moment from "moment";

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
            try {
                const settings = await axios.get(
                    `${process.env.VUE_APP_BASE_URL}/admin/settings`
                );
                commit("SET_SETTINGS", settings.data.data);
                return events;
            } catch (err) {
                return err;
            }
        },

        async updateSettings({ commit }, settingsOption) {
            try {
                const res = await axios.put(`${process.env.VUE_APP_BASE_URL}/admin/setting/${settingsOption.id}`, { key: settingsOption.key, value: settingsOption.value });
                return res
            } catch (err) {
                return err
            }
        },

        
    }

}