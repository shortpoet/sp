import * as myTest from '@/utils/myTest'
const { propsMocker, createWrapper } = myTest.default
import StartExperience from '@/components/Resume/Start/StartExperience'
import {cloneDeep} from 'lodash'

describe('StartExperience.vue', () => {

  const component = StartExperience
  // const props = Object.keys(component.props)

  // this was for the _propsMocker attempt
  // const props = [
  //     'experiences',
  //     'type',
  //     ['jobs', 'position', 'company', 'description', '1'],
  //     '4'
  //   ]

  const experiences = ['software', 'language', 'sales', 'hospitality']

  const jobs =  [propsMocker(['position', 'company', 'description', 'startDate', 'endDate']).propsData]
  const propsObject = {
    propsData: {
      experiences: experiences.map(e => {
        return {
          type: e,
          jobs: jobs
        }
      })
    }
  }
  let wrapper = createWrapper(component, propsObject)

  let prop
  let selector
  let mockProp = true

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders experience .start-experience-header', () => {

    prop = 'Experience'
    selector = '.start-experience-header'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience .start-experience-type that matches type prop', () => {

    selector = '.start-experience-type'
    const typeArray = wrapper.findAll(`${selector}`)
    for (let i in experiences) {
      expect(typeArray.at(i).text()).toMatch(experiences[i])
    }
  })
  it('renders experience h3 that matches position prop', () => {

    prop = 'sample position'
    selector = 'h3'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience .start-company that matches company prop', () => {

    prop = 'sample company'
    selector = '.start-company'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience span that matches start/end date prop', () => {

    prop = 'sample startDate - sample endDate'
    selector = 'span'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience p that matches text prop accounting for splits', () => {

    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.experiences.map(e => {
      e.jobs.map(j => {
        j.description = `description part 1\\n\\rdescription part 2\\n\\rdescription part 3`
      })
    })    
    
    selector = 'p'
    wrapper = createWrapper(component, _propsObject)

    const typeArray = wrapper.findAll(`${selector}`)

    let pIndex = 0
    _propsObject.propsData.experiences.forEach((e, ie) => {
      e.jobs.forEach((j, ij) => {
          for (let id in [...Array(3).keys()]) {
            id = parseInt(id)
            const hashedClass = `job-${ij + 1}-description-${id + 1}`
            expect(typeArray.at(pIndex).attributes().class).toMatch(hashedClass)
            pIndex++
          }
        })
    })

  })
  it('matches experience snapshot', () => {
    
    // same wrapper object from previous tests adds the split descriptions
    // bec a new wrapper was not instantiated
    expect(wrapper.html()).toMatchSnapshot()

  })
})
