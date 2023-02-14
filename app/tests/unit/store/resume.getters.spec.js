import { getters } from '@/store/modules/resume/StoreResume'

describe('Resume Store Getters', () => {
  let state

  beforeEach(() => {
    state = {
      resume: {
        title: "Test Resume"
      },
      resumeLoaded: true
    }
  })
  describe('getResume', () => {
    it('returns a resume', () => {
      expect(getters.getResume(state)).toEqual(state.resume)
    })    
  })
  describe('getResumeLoaded', () => {
    it('returns true when there is a resume in state', () => {
      expect(getters.getResumeLoaded(state)).toBe(true)
    })    
    it('returns false when there is no resume in state', () => {
      expect(getters.getResumeLoaded({ resume: null, resumeLoaded: false })).toBe(false)
    })    
  })
})
