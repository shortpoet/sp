import {hardResume} from '@/assets/resume.js'

export const propsFinder = (props) => {
  let propsData = {}
  props.map(prop => {
    propsData[`${prop}`] = hardResume[`${prop}`]
  })
  // console.log(propsData)
  return {
    propsData
  }
}

module.exports = propsFinder