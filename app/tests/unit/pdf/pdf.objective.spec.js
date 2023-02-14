import * as myTest from '@/utils/myTest'
const { textMatcher, propsMocker, createWrapper } = myTest.default
import PDFObjective from '@/components/Resume/PDF/PDFObjective'
import {cloneDeep} from 'lodash'

describe('PDFObjective.vue', () => {

  const component = PDFObjective
  // catches the boolean in function
  // didn't happen in awards because propsFinder instead of mocker
  // const props = Object.keys(component.props)
  const props = ['aboutMe']
  const propsObject = propsMocker(props)
  let wrapper = createWrapper(component, propsObject)

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
  it('matches renderPDF objective snapshot', () => {

    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.renderPDF = true

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()

  })
})
