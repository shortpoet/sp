// import VueCookies from 'vue-cookies'

import createStoreResume from '@/store/modules/resume/createStoreResume'

import {
  SET_ENV,
  SET_URL_PREFIX
} from '@/store/mutation-types'

import {
} from '@/store/api-endpoints'

export const state = {
  environment: null,
  urlPrefix: null,
  BACKEND_PREFIX_PROD: process.env.VUE_APP_BACKEND_PREFIX_PROD,
  BACKEND_PREFIX_DEV: process.env.VUE_APP_BACKEND_PREFIX_LOCAL
}

// export const rootGetters = {
export const getters = {
  getUrlPrefix (state) {
    return state.urlPrefix
  },
  getEnv (state) {
    return state.environment
  }
}

export const mutations = {
  [SET_ENV] (state, newEnv) { state.environment = newEnv},
  [SET_URL_PREFIX] (state) {
    if (state.environment === 'production') {
      state.urlPrefix = state.BACKEND_PREFIX_PROD
    } else if (state.environment === 'development') { 
      state.urlPrefix = state.BACKEND_PREFIX_DEV
    } else {
      state.urlPrefix = ''
    }
  }
}

export const actions = {
  loadEnv ({ commit }, env) {
    commit('SET_ENV', env)
    commit('SET_URL_PREFIX')
  }
}

export const modules =  {
  resume: createStoreResume.createStoreResume()
}


export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
