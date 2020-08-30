import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { fectchData } from '../api/index'
export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      fetchItem({ commit }) {
        return fectchData().then((res) => {
          commit('setItem', res.data)
        })
      },
    },

    mutations: {
      setItem(state, data) {
        state.items = data
      },
    },
  })
}
