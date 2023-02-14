import { state, getters, mutations, actions } from './StoreResume'

export const createStoreResume = () => {
  return  {  
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
  }
}

/* istanbul ignore next */
export const createStoreResumeMocks = (custom = { getters: {}, mutations: {}, actions: {}, state: {} }) => {
  const mockState = Object.assign({}, state, custom.state);
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  return  {  
    namespaced: true,
    state: mockState,
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions
  }
}

export default {
  createStoreResume,
  createStoreResumeMocks
}
