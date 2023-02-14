import * as myTest from '@/utils/myTest'
const { textMatcher, propsMocker, createWrapper } = myTest.default
import StartObjective from '@/components/Resume/Start/StartObjective'

describe('StartObjective.vue', () => {

  const component = StartObjective
  const props = Object.keys(component.props)
  const wrapper = createWrapper(component, propsMocker(props))

  let prop
  let selector
  let mockProp = true

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders objective p that matches aboutMe prop', () => {

    prop = 'aboutMe'
    selector = 'p'
    textMatcher(component, props, prop, selector)

  })
  it('matches objective snapshot', () => {
    
    expect(wrapper.html()).toMatchSnapshot()

  })
})
