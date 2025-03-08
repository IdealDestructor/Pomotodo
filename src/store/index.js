import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        todoList: [],
        flag: false,
    },
    getters: {
        allNum: state => { return state.todoList.length },
        undo: state => {
            return state.todoList.filter((todo) => todo.isDone === false)
        },
        finishNum: state => {
            return state.todoList.filter((todo) => todo.isDone === true).length
        },
    },
    mutations: {
        update (state, payload) {
            state.todoList = payload
        },
        delete (state, payload) {
            state.todoList = state.todoList.filter((todo) => todo.uuid != payload.uuid)
        },
        add (state, payload) {
            state.todoList.push(payload)
        },
        done (state, payload) {
            console.log(payload)
            state.todoList.map((todo) => {
                if (payload.findIndex((item) => item.uuid == todo.uuid) > -1) {
                    todo.isDone = true
                } else {
                    todo.isDone = false
                }
                return todo
            })
        },
        flag (state, payload) {
            state.flag = payload
        },
    },
    actions: {
        initTodo ({ commit }, payload) {
            commit('update', payload)
        },
        async handleUpdate ({ commit, state }, { nowContent, nowContentID }) {
            await commit('flag', false)
            let newTodoList = state.todoList.map((todo) => {
                if (todo.uuid == nowContentID) {
                    todo.content = nowContent
                }
                return todo
            })
            await commit('update', newTodoList)
            await commit('flag', true)
        },
        async handleDelete ({ commit }, payload) {
            await commit('flag', false)
            await commit('delete', payload)
            await commit('flag', true)
        },
        handleAdd ({ commit }, payload) {
            commit('add', payload)
        },
        toggleSelection ({ commit, getters }) {
            commit('update', getters.undo)
        },
        handleSelectionChanged ({ commit, state }, payload) {
            if (state.flag)
                commit('done', payload)
        },
        handleMounted ({ commit }) {
            commit('flag', true)
        }
    },
})

export default store