import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import PDFBorder from '@/components/Resume/PDF/PDFBorder'
import { cloneDeep } from 'lodash'

describe('PDFBorder.vue', () => {

  const component = PDFBorder
  const mountOptions = {
    propsData: {
      size: 1,
      marginX: 2,
      color: null
    }
  }
  let wrapper

  let color
  let styleObject 
  let expected

  beforeEach(() => {
    wrapper = createWrapper(component, mountOptions)
    color = null
    styleObject = {
      borderWidth: ``,
      margin: ``,
    }
    expected = `border-width: 0.25rem; margin: 0.5rem;`
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders hr with correctly calculated style with color', () => {

    const _mountOptions = cloneDeep(mountOptions)
    _mountOptions.propsData.color = 'green'
    expected += ` color: green`

    wrapper = createWrapper(component, _mountOptions)

    expect(wrapper.find('hr').attributes().style).toMatch(expected)

  })
  it('renders hr with correctly calculated style without color', () => {
    
    expect(wrapper.find('hr').attributes().style).toMatch(expected)

  })
  it('matches snapshot', () => {

    expect(wrapper.html()).toMatchSnapshot()

  })
})
