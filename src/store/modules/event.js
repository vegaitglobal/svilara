import axios from "axios";
import * as _ from "lodash";
import moment from "moment";
import Fuse from "fuse.js";

var fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"]
};

const sortByDate = (a, b) => {
  return new Date(a.created).getTime() - new Date(b.created).getTime();
};

const searchColorsByType = (settings, type) => {
  for (var i = 0; i < settings.length; i++) {
    if (settings[i].key === "otvoren bez prijave") {
      settings[i].key = "otvorenbp";
    }
    if (settings[i].key === "otvoren sa prijavom") {
      settings[i].key = "otvorensp";
    }
    if (settings[i].key === type) {
      return settings[i].value;
    }
  }
};

export default {
  state: {
    questions: [],
    answers: [],
    image: "",
    selectedMonth: moment(new Date()),
    events: [],
    adminEvents: [],
    searchedEvents: [],
    searching: false
  },

  getters: {
    getEvents(state) {
      return state.events;
    },

    getAdminEvents(state) {
      return state.adminEvents;
    },

    getQuestions(state) {
      return state.questions;
    },

    eventsSortedByCreationTime(state) {
      return state.events.sort(sortByDate);
    },

    getCalendarEvents(state, rootState) {
      let settings = rootState.getSettings();

      let serializedEvents = [];
      for (var i = 0; i < state.adminEvents.length; i++) {
        var color = searchColorsByType(settings, state.adminEvents[i].type);
        var borderColor = searchColorsByType(settings, "placanje");
        let parsedEvent = {
          id: state.adminEvents[i].id,
          title: state.adminEvents[i].title,
          start: new Date(state.adminEvents[i].startTime),
          end: new Date(state.adminEvents[i].endTime),
          backgroundColor: color,
          borderColor:
            state.adminEvents[i].price === 0 ? undefined : borderColor,
          displayEventEnd: true,
          extendedProps: {
            id: state.adminEvents[i].id,
            title: state.adminEvents[i].title,
            description: state.adminEvents[i].description,
            type: state.adminEvents[i].type,
            price: state.adminEvents[i].price,
            category: state.adminEvents[i].category,
            space: state.adminEvents[i].space,
            socialMedia: state.adminEvents[i].socialMedia,
            age: state.adminEvents[i].age,
            startTime: state.adminEvents[i].startTime,
            endTime: state.adminEvents[i].endTime,
            picture: state.adminEvents[i].picture,
            logo: state.adminEvents[i].logo
          }
        };
        serializedEvents.push(parsedEvent);
      }
      return serializedEvents;
    },

    getSelectedMonth(state) {
      var month = state.selectedMonth.locale("sr").format("MMMM Y");
      return month.charAt(0).toUpperCase() + month.slice(1);
    },

    getSearchedEvents(state) {
      return state.searchedEvents;
    },

    getSearching(state) {
      return state.searching;
    }
    // getters: {
    //   getEvents(state) {
    //     return state.events;
    //   },

    //   getSelectedMonth(state) {
    //     var month = state.selectedMonth.locale("sr").format("MMMM Y");
    //     return month.charAt(0).toUpperCase() + month.slice(1);
    //   },

    //   getSearchedEvents(state) {
    //     return state.searchedEvents;
    //   }
  },

  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },

    ANSWER_QUESTION(state, questionAnswers) {
      state.answers.push(questionAnswers);
    },

    SET_EVENTS(state, events) {
      state.events = events;
    },

    SET_ADMIN_EVENTS(state, events) {
      state.adminEvents = events;
    },

    INCREASE_MONTH(state) {
      state.selectedMonth = moment(state.selectedMonth.add(1, "M"));
    },

    DECREASE_MONTH(state) {
      state.selectedMonth = moment(state.selectedMonth.add(-1, "M"));
    },

    REMOVE_ANSWER(state, id) {
      for (var i = 0; i < state.answers.length; i++) {
        if (state.answers[i].question.id === id) {
          state.answers.splice(i, 1);
        }
      }
    },

    SET_IMAGE(state, file) {
      state.image = file;
    },

    // SET_EVENTS(state, events) {
    //   state.events = events;
    //   // state.searchedEvents = events;
    // },

    SET_SEARCHED_EVENTS(state, events) {
      state.searchedEvents = events;
    },

    SET_SEARCHING(state, status) {
      state.searching = status;
      // state.searchedEvents = state.events;
    }
  },

  actions: {
    async fetchQuestions({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/admin/questions`)
          .then(res => {
            commit("SET_QUESTIONS", res.data.data);
            resolve(res.data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    async answerQuestion({ commit }, { question, answers }) {
      commit("REMOVE_ANSWER", question.id);
      commit("ANSWER_QUESTION", {
        question: {
          id: question.id,
          text: question.text,
          order: question.order
        },
        answers,
        type: question.fieldType,
        name: question.name
      });
    },

    async setImage({ commit }, file) {
      commit("SET_IMAGE", file);
    },

    submitEvent({ commit, state }) {
      var formData = new FormData();

      for (var i = 0; i < state.answers.length; i++) {
        if (state.answers[i].type === "file") {
          formData.append(
            state.answers[i].name,
            state.answers[i].answers,
            state.answers[i].name
          );
        }
        if (state.answers[i].name === "email") {
          formData.append(state.answers[i].name, state.answers[i].answers);
        }
      }
      formData.set("formAnswers", JSON.stringify(state.answers));
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/event`, formData)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    async increaseMonth({ commit, dispatch }) {
      commit("INCREASE_MONTH");
      dispatch("filterByMonth");
    },

    async decreaseMonth({ commit, dispatch }) {
      commit("DECREASE_MONTH");
      dispatch("filterByMonth");
    },

    async fetchEvents({ commit }) {
      try {
        const events = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/user/events`
        );
        commit("SET_EVENTS", events.data.data);
        return events;
      } catch (err) {
        return err;
      }
    },

    async fetchAdminEvents({ commit }) {
      try {
        const events = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/admin/events`
        );
        console.log(events);
        commit("SET_ADMIN_EVENTS", events.data.data);
        return events;
      } catch (err) {
        return err;
      }
    },

    async fetchAdminEventsTable({ commit }) {
      try {
        const events = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/admin/events/table`
        );
        //commit("SET_ADMIN_EVENTS", events.data.data);
        return events;
      } catch (err) {
        return err;
      }
    },

    async searchEvent({ commit, state }, query) {
      let result;
      let eventsWithoutDuplicates = state.events.filter(ev => {
        for (let prop in ev) {
          if (ev[prop] == null) {
            return false;
          }
        }
        return true;
      });
      if (!query == "") {
        commit("SET_SEARCHING", true);
        result = eventsWithoutDuplicates.filter((ev) => {
          if (ev.title.toLowerCase().includes(query.toLowerCase())){
            return true;
          }
          return false;
        })
        // let fuse = new Fuse(eventsWithoutDuplicates, fuseOptions);
        // result = fuse.search(query);
        console.log(result);
      } else {
        commit("SET_SEARCHING", false);
        result = eventsWithoutDuplicates;
        console.log(result);
      }
      commit("SET_SEARCHED_EVENTS", result);
    },

    async filterByMonth({ commit, state }) {
      let filtered = [];

      for (var i = 0; i < state.events.length; i++) {
        if (
          moment(new Date(state.events[i].startTime)).isSame(
            state.selectedMonth,
            "month"
          )
        ) {
          filtered.push(state.events[i]);
        }
      }
      commit("SET_SEARCHED_EVENTS", filtered);
    },

    async updateQuestion({ commit }, question) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BASE_URL}/admin/question/${question.id}`,
          question
        );
        return res;
      } catch (err) {
        return err;
      }
    },

    async updateEvent({ commit }, question) {
      try {
        const res = await axios.put(
          `${process.env.VUE_APP_BASE_URL}/admin/question/${question.id}`,
          question
        );
      } catch (err) {
        return err;
      }
    },
    async deleteQuestion({ dispatch }, id) {
      try {
        const res = await axios.delete(
          `${process.env.VUE_APP_BASE_URL}/admin/question/${id}`
        );
        dispatch("fetchQuestions");
        return res;
      } catch (err) {
        return err;
      }
    },

    async addQuestion({ dispatch }, question) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/admin/question`,
          question
        );
        dispatch("fetchQuestions");
      } catch (err) {
        return err;
      }
    }
  }
};
