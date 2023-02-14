import { mutations } from '@/store/modules/resume/StoreResume'

const { SET_RESUME_RAW, SET_RESUME, SET_RESUME_LOADED } = mutations

describe('Resume Store Mutations', () => {
  let state

  beforeEach(() => {
    state = {
      resume: null,
      resumeLoaded: false
    }
  })
  describe('SET_RESUME_RAW', () => {
    it('parses raw resume data and sets state resume', () => {

      const data = {
        aboutMe: 'Test About',
        address: 'Test address',
        brief: 'Test About',
        email: 'Test email',
        flags: 'Test flags',
        interests: 'Test interests',
        name: 'Test name',
        surname: 'Test surname',
        title: 'Test title',
        visas: 'Test visas',
        resumeEducations: [{education: {institution: 'test education'}}],
        resumeJobs: [
          // not having line breaks here resulted in poor readability and
          // taking extra time to find the correct 'line' (which wasn't a line lol)
          {job: {company: 'test job', experienceType: 'software'}},
          {job: {company: 'test job', experienceType: 'language'}},
          // see below
          // {job: {company: 'test job', experienceType: 'sales'}},
          {job: {company: 'test job', experienceType: 'hospitality'}}
        ],
        resumeSkills: [{skill: {details: 'test skill'}}],
        resumeSocials: [{social: {social: 'test skill'}}],
        resumeSpokenLanguages: [{spokenLanguages: {language: 'test skill'}}],
        experiences: []
      }
      const newResume = {
        aboutMe: 'Test About',
        address: 'Test address',
        brief: 'Test About',
        email: 'Test email',
        flags: 'Test flags',
        interests: 'Test interests',
        name: 'Test name',
        surname: 'Test surname',
        title: 'Test title',
        visas: 'Test visas',
        educations: [{institution: 'test education'}],
        jobs: [
          {company: 'test job', experienceType: 'software'},
          {company: 'test job', experienceType: 'language'},
          // see below
          // {company: 'test job', experienceType: 'sales'},
          {company: 'test job', experienceType: 'hospitality'}
        ],
        skills: [{details: 'test skill'}],
        socials: [{social: 'test skill'}],
        spokenLanguages: [{language: 'test skill'}],
        experiences: [
          {type: 'software', jobs: [{company: 'test job', experienceType: 'software'}]},
          {type: 'language', jobs: [{company: 'test job', experienceType: 'language'}]},
          // TODO
          // commenting here since no sales category for now
          // this test is likely in need of review and refactor
          // #TODO
          // {type: 'sales', jobs: [{company: 'test job', experienceType: 'sales'}]}, 
          {type: 'hospitality', jobs: [{company: 'test job', experienceType: 'hospitality'}]}
        ]
      }
      
      SET_RESUME_RAW(state, data)
      expect(state.resume).toEqual(newResume)
    })    
  })
  describe('SET_RESUME', () => {
    it('sets state resume to newResume', () => {
      const newResume = {
        resume: {
          title: "Test Resume"
        }
      }
      SET_RESUME(state, newResume)
      expect(state.resume).toEqual(newResume)
    })    
  })
  describe('SET_RESUME_LOADED', () => {
    it('sets resume loaded state after resume is loaded', () => {
      SET_RESUME_LOADED(state, true)
      expect(state.resumeLoaded).toBe(true)
    })    
  })
})
