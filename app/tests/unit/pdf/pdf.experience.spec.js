import * as myTest from '@/utils/myTest'
const { createWrapper, propsMocker } = myTest.default
import PDFExperience from '@/components/Resume/PDF/PDFExperience'
import {cloneDeep} from 'lodash'

describe('PDFExperience.vue', () => {

  const component = PDFExperience
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

  it('renders experience h4 header', () => {

    prop = 'Experience'
    selector = 'h4'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience h5 that matches position prop', () => {

    prop = 'sample position'
    selector = 'h5'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience .pdf-company that matches company prop', () => {

    prop = 'sample company'
    selector = '.pdf-company'
    expect(wrapper.find(`${selector}`).text()).toMatch(prop)

  })
  it('renders experience .pdf-experience-dates that matches start/end date prop', () => {

    prop = 'sample startDate - sample endDate'
    selector = '.pdf-experience-dates'
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
  it('matches renderPDF experience snapshot', () => {
    
    // new wrapper bec need to modify propsData to add renderPDF boolean
    
    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.experiences.map(e => {
      e.jobs.map(j => {
        j.description = `description part 1\\n\\rdescription part 2\\n\\rdescription part 3`
      })
    })    
    _propsObject.propsData.renderPDF = true

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()

  })
})
