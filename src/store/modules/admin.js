import axios from "axios";
import * as _ from "lodash";
import moment from "moment";

export default {
    // state: {
    //     questions: [],
    //     answers: [],
    //     image: '',
    //     selectedMonth: moment(new Date()),
    //     events: [],
    //     searchedEvents: [],
    //     searching: false
    // },

    // getters: {
    //     getEvents(state) {
    //         return state.events;
    //     },
    // },

    // mutations: {
    //     SET_EVENTS(state, events) {
    //         state.events = events;
    //     },

    // },

    // actions: {
    //     async fetchEvents({ commit }) {
    //         try {
    //             const events = await axios.get(
    //                 `${process.env.VUE_APP_BASE_URL}/user/events`
    //             );
    //             commit("SET_EVENTS", events.data.data);
    //             return events;
    //         } catch (err) {
    //             return err;
    //         }
    //     },
    // }

}