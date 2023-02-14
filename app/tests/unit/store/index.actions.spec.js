import { actions } from '@/store/index'

import {
  SET_ENV,
  SET_URL_PREFIX
} from '@/store/mutation-types'

describe('Index Store Actions', () => {
  const commit = jest.fn()
  let process
  let state
  state = {
    environment: null,
  }
  beforeEach(() => {
    process = {
      env: {
        NODE_ENV: 'development'
      }
    }

    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('loadEnv', () => {
    it('loads the environment and url prefix state accrodring to node env development', () => {
      const env = process.env.NODE_ENV
      actions.loadEnv({commit}, env)
      expect(commit).toHaveBeenCalledWith(SET_ENV, env)
      expect(commit).toHaveBeenCalledWith(SET_URL_PREFIX)
    })
    it('loads the environment and url prefix state accrodring to node env production', () => {
      process = {
        env: {
          NODE_ENV: 'production'
        }
      }  
      const env = process.env.NODE_ENV
      actions.loadEnv({commit}, env)
      expect(commit).toHaveBeenCalledWith(SET_ENV, env)
      expect(commit).toHaveBeenCalledWith(SET_URL_PREFIX)
    })
  })

})

