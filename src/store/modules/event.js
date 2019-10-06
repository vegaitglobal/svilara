import axios from "axios";
import * as _ from "lodash";
import moment from "moment";
import Fuse from "fuse.js";

var fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"]
};

export default {
  state: {
    questions: [],
    answers: [],
    image: "",
    selectedMonth: moment(new Date()),
    events: [],
    searchedEvents: []
  },

  getters: {
    getEvents(state) {
      return state.events;
    },

    getSelectedMonth(state) {
      var month = state.selectedMonth.locale("sr").format("MMMM Y");
      return month.charAt(0).toUpperCase() + month.slice(1);
    },

    getSearchedEvents(state) {
      return state.searchedEvents;
    }
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

    SET_EVENTS(state, events) {
      state.events = events;
      state.searchedEvents = events;
    },

    SET_SEARCHED_EVENTS(state, events) {
      state.searchedEvents = events;
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
        question: { id: question.id, text: question.text },
        answers,
        type: question.fieldType,
        name: question.name
      });
    },

    async setImage({ commit }, file) {
      commit("SET_IMAGE", file);
    },

    async submitEvent({ commit, state }) {
      var formData = new FormData();
      for (var i = 0; i < state.answers.length; i++) {
        if (state.answers[i].type === "file") {
          formData.append(state.answers[i].name, state.answers[i].answers);
        }
      }
      formData.set("formAnswers", JSON.stringify(state.answers));

      if (state.answers[i].type === "file") {
        formData.append(state.answers[i].name, state.answers[i].answers);
      }

      axios
        .post(`${process.env.VUE_APP_BASE_URL}/user/event`, formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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

    async searchEvent({ commit, state }, query) {
      let result;
      if (!query == "") {
        let fuse = new Fuse(state.events, fuseOptions);
        result = fuse.search(query);
      } else result = state.events;
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
    }
  }
};
