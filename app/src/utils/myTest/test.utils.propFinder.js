import {hardResume} from '@/assets/resume.js'

export const propFinder = (prop) => {
  return {
    propsData: {
      [`${prop}`]: hardResume[`${prop}`]
    }
  }
}

module.exports = propFinder