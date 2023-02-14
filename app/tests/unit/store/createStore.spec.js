import createStore from '@/store/createStore'
import { state, getters, mutations, actions, modules } from '@/store/index'

describe('createStore', () => {
  it('creates an object to be used in configuring a new store instance', () => {
    const storeConfig = createStore.createStore()
    
    const expected = {
      state: state,
      getters: getters,
      mutations: mutations,
      actions: actions,
      modules: modules
    }

    expect(storeConfig).toMatchObject(expected)
  })
})