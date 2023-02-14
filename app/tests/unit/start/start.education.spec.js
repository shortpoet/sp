import * as myTest from '@/utils/myTest'
const { textMatcher, propsMocker, createWrapper } = myTest.default
import StartEducation from '@/components/Resume/Start/StartEducation'

describe('StartEducation.vue', () => {

  const component = StartEducation
  // const props = Object.keys(component.props)
  const props = {
    educations: ['institution', 'degree', 'details', 'focus', '3']
  }  

  const propsObject = propsMocker(props)
  
  const wrapper = createWrapper(component, propsMocker(props))

  let prop
  let selector
  let mockProp = true

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders education h2', () => {

    // hard coded header
    expect(wrapper.find("h2").text()).toMatch("Education")

  })
  it('renders education h3 that matches institution prop', () => {

    prop = 'institution'
    selector = 'h3'
    textMatcher(component, props, prop, selector)

  })
  it('renders education .start-degree that matches degree prop', () => {

    prop = 'degree'
    selector = '.start-degree'
    textMatcher(component, props, prop, selector)

  })
  it('renders education .start-education-details that matches details prop', () => {

    prop = 'details'
    selector = '.start-education-details'
    textMatcher(component, props, prop, selector)

  })
  it('renders education span that matches focus prop', () => {

    prop = 'focus'
    selector = 'span'
    textMatcher(component, props, prop, selector)

  })
  it('matches education snapshot', () => {
    
    expect(wrapper.html()).toMatchSnapshot()

  })
})
