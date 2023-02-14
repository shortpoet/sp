import { actions } from '@/store/modules/resume/StoreResume'
import {hardResume} from '@/assets/resume.js'
import axios from 'axios'

import {
  SET_RESUME_RAW,
  SET_RESUME,
  SET_RESUME_LOADED
} from '@/store/mutation-types'

describe('Resume Store Actions', () => {
  let state
  let mockError
  let response
  
  const rootGetters = jest.fn()
  const commit = jest.fn()
  const dispatch = jest.fn()

  beforeEach(() => {
    state = {
      resume: null,
      resumeLoaded: false
    }
    mockError = null
    response = {
      data: {
        resume: {
          title: "Test Resume"
        }
      }
    }
  })

  describe('loadResume', () => {
    it('calls the api, loads the raw resume data and sets loaded boolean to true', async () => {

      await actions.loadResume({commit, rootGetters})

      expect(commit).toHaveBeenCalledWith(SET_RESUME_RAW, response.data)
      const hasResume = !!response.data
      expect(commit).toHaveBeenCalledWith(SET_RESUME_LOADED, hasResume)


    })
    it('dispatches loadHardResume action in case of loadResume error', async () => {

      mockError = () => {throw Error('Mock Axios Error')}
      // temporarily reassigning console.error to silence the logging of the 
      // purposefully thrown error
      // https://til.hashrocket.com/posts/hrhejhqg2n-turn-off-console-error-messages-in-a-test
      const originalError = console.error
      console.error = jest.fn()

      axios.get.mockImplementation(mockError)
      await actions.loadResume({rootGetters, dispatch})

      expect(dispatch).toHaveBeenCalledWith('loadHardResume')

      console.error = originalError
    })    
  })

  describe('loadHardResume', () => {
    it('loads hard coded resume from js file in assets in case of loadResume error', async () => {
      
      await actions.loadHardResume({ commit })

      expect(commit).toHaveBeenCalledWith(SET_RESUME, hardResume)

      const hasResume = !!hardResume.title

      expect(commit).toHaveBeenCalledWith(SET_RESUME_LOADED, hasResume)

    })
  })
})

