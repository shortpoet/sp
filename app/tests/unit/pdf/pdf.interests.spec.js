import * as myTest from '@/utils/myTest'
const { textMatcher, propsMocker, createWrapper } = myTest.default
import PDFInterests from '@/components/Resume/PDF/PDFInterests'

describe('PDFInterests.vue', () => {

  const component = PDFInterests
  const props = Object.keys(component.props)
  const wrapper = createWrapper(component, propsMocker(props))

  let prop
  let selector
  let mockProp = true
  
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders interests h4', () => {

    // hard coded header
    expect(wrapper.find("h4").text()).toMatch("Interests")

  })
  it('renders interests p that matches prop value', () => {

    prop = 'interests'
    selector = 'p'
    textMatcher(component, props, prop, selector)

  })
  it('matches snapshot', () => {

    expect(wrapper.html()).toMatchSnapshot()

  })
})
