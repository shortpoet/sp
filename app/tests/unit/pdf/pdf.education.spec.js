import * as myTest from '@/utils/myTest'
const { textMatcher, propsMocker, createWrapper } = myTest.default
import PDFEducation from '@/components/Resume/PDF/PDFEducation'
import { cloneDeep } from 'lodash'

describe('PDFEducation.vue', () => {

  const component = PDFEducation
  // const props = Object.keys(component.props)
  const props = {
    educations: ['institution', 'degree', 'details', 'focus', '3']
  }  

  const propsObject = propsMocker(props)
  
  let wrapper = createWrapper(component, propsObject)

  let prop
  let selector
  let mockProp = true

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders education h4', () => {

    // hard coded header
    expect(wrapper.find("h4").text()).toMatch("Education")

  })
  it('renders education h5 that matches institution prop', () => {

    prop = 'institution'
    selector = 'h5'
    textMatcher(component, props, prop, selector)

  })
  it('renders education .pdf-degree that matches degree prop', () => {

    prop = 'degree'
    selector = '.pdf-degree'
    textMatcher(component, props, prop, selector)

  })
  it('renders education p that matches details prop', () => {

    prop = 'details'
    selector = 'p'
    textMatcher(component, props, prop, selector)

  })
  it('renders education pdf-education-focus that matches focus prop', () => {

    prop = 'focus'
    selector = '.pdf-education-focus'
    textMatcher(component, props, prop, selector)

  })
  it('matches education snapshot', () => {
    
    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.renderPDF = false

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()

  })
  it('matches education snapshot', () => {
    
    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.renderPDF = true

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()

  })
})
