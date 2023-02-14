import axios from 'axios'
import {hardResume} from '@/assets/resume.js'

import {
  SET_RESUME_RAW,
  SET_RESUME,
  SET_RESUME_LOADED
} from '@/store/mutation-types'

import {
  endpoints
} from '@/store/api-endpoints'

export const state = {
  resume: null,
  resumeLoaded: false
}

export const getters = {
  getResume: (state) => state.resume,
  getResumeLoaded: (state) => state.resumeLoaded
}

export const mutations = {
  [SET_RESUME_RAW] (state, data) { 
    // const experienceTypes = response.data.resumeJobs.map(j => j.job.experienceType).filter((v, i, a) => a.indexOf(v) === i && v !== null)
    // TODO
    // hardcoded experience types for order - not ideal
    // either add order to db schema or some kind of switch logic
    // #TODO
    const experienceTypes = ['software', 'language', 'hospitality']
    const resume = {
      aboutMe: data.aboutMe,
      address: data.address,
      brief: data.brief,
      email: data.email,
      flags: data.flags,
      interests: data.interests,
      name: data.name,
      surname: data.surname,
      title: data.title,
      visas: data.visas,
      educations: data.resumeEducations.map(re => re.education),
      jobs: data.resumeJobs.map(re => re.job),
      skills: data.resumeSkills.map(re => re.skill),
      socials: data.resumeSocials.map(re => re.social),
      spokenLanguages: data.resumeSpokenLanguages.map(re => re.spokenLanguages),
      experiences: []
    }
    experienceTypes.forEach(et => {
      resume.experiences.push({
        type: et,
        jobs: resume.jobs.filter(j => j.experienceType === et)
      })
    })
    // console.log(resume)
    state.resume = resume
  },
  [SET_RESUME] (state, newResume) { state.resume = newResume },
  [SET_RESUME_LOADED] (state, newState) { state.resumeLoaded = newState }
}


export const actions = {
  async loadResume ({ commit, rootGetters, dispatch }) {
    try {
      const resPoint = endpoints.resume.RESUME_FETCH_LATEST_API
      const url = rootGetters.getUrlPrefix + resPoint
      const response = await axios.get(url)
      // console.log(response.data)
      commit(SET_RESUME_RAW, response.data)
      const hasResume = !!response.data
      commit(SET_RESUME_LOADED, hasResume)
      // console.info('resume loaded')
    } catch (err) {
      console.error(err)
      dispatch('loadHardResume')
    }
  },
  async loadHardResume ({ commit }) {
      commit(SET_RESUME, hardResume)
      const hasResume = !!hardResume.title
      commit(SET_RESUME_LOADED, hasResume)
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}