import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        board: null,
        nickname: null
    },
    getters: {
        getBoard(state) {
          return state.board
        },
        getNickname(state) {
          return state.nickname
        }
    },
    mutations: {
        setBoard(state, board) {
            state.board = board
        },
        setNickname(state, nickname) {
            state.nickname = nickname
        }
    }
})

export default store
