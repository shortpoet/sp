import { mutations } from '@/store/index'

const { SET_ENV, SET_URL_PREFIX } = mutations

describe('Index Store Mutations', () => {

  const process = {
    env: {
      VUE_APP_BACKEND_PREFIX_PROD: "https://shortpoet.azurewebsites.net",
      VUE_APP_BACKEND_PREFIX_LOCAL: "https://localhost:5001"
    }
  }

  let state

  beforeEach(() => {
    state = {
      environment: null,
      urlPrefix: null,
      BACKEND_PREFIX_PROD: process.env.VUE_APP_BACKEND_PREFIX_PROD,
      BACKEND_PREFIX_DEV: process.env.VUE_APP_BACKEND_PREFIX_LOCAL
    }
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('SET_ENV', () => {
    it('sets the environment state according to env from action', () => {
      const newState = 'some state'
      SET_ENV(state, newState)
      expect(state.environment).toMatch(newState)
    })
  })

  describe('SET_URL_PREFIX', () => {
    it('sets the urlPrefix state according to environment state development', () => {
      state.environment = 'development'
      SET_URL_PREFIX(state, state.environment)
      expect(state.urlPrefix).toMatch(state.BACKEND_PREFIX_DEV)
    })
    it('sets the urlPrefix state according to environment state production', () => {
      state.environment = 'production'
      SET_URL_PREFIX(state, state.environment)
      expect(state.urlPrefix).toMatch(state.BACKEND_PREFIX_PROD)
    })
    it('sets urlPrefix to empty string - page fails if environment state is neither production nor development', () => {
      state.environment = null
      SET_URL_PREFIX(state, state.environment)
      expect(state.urlPrefix).toMatch('')
    })
  })

})
