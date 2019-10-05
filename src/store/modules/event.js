import axios from 'axios';
import * as _ from 'lodash';

export default {
    state: {
        questions: [],
        answers: []
    },

    getters: {

    },

    mutations: {
        SET_QUESTIONS(state, questions) {
            state.questions = questions
        },

        ANSWER_QUESTION(state, questionAnswers) {
            state.answers.push(questionAnswers)
        },

        REMOVE_ANSWER(state, id) {
            for (var i = 0; i < state.answers.length; i++) {
                console.log(state.answers[i].question.text)
                if (state.answers[i].question.id === id) {
                    state.answers.splice(i, 1)
                }
            }
        }
    },

    actions: {
        async fetchQuestions({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BASE_URL}/admin/questions`).then(res => {
                    console.log(res.data)
                    commit('SET_QUESTIONS', res.data.data)
                    resolve(res.data.data)
                }).catch(err => {
                    reject(err)
                })

            })
        },

        async answerQuestion({ commit }, { question, answers }) {
            commit('REMOVE_ANSWER', question.id)
            commit('ANSWER_QUESTION', { question: { id: question.id, text: question.text }, answers })
        }
    }
}