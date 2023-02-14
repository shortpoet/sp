import * as myTest from '@/utils/myTest'
const { textMatcherFactory, createWrapper, propsMocker, propMocker } = myTest.default
import StartAbout from '@/components/Resume/Start/StartAbout'

describe('StartAbout.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  const component = StartAbout
  // const props = Object.keys(component.props)
  const propDicts = [
    {prop: 'name', selector: 'h1'},
    {prop: 'surname', selector: 'span'},
    {prop: 'flags', selector: '#start-flags'},
    {prop: 'email', selector: 'a'},
    {prop: 'address', selector: '#start-address'},
    {prop: 'visas', selector: '#start-visas'},
  ]
  let mockProp = true
  
  const props = propDicts.map(d => d.prop)
  const wrapper = createWrapper(component, propsMocker(props))

  // this function creates an it/test:
  // 'renders interests ${dict.selector} that matches ${dict.prop} prop'
  // for each prop in prop dict
  textMatcherFactory(component, propDicts)

  it('email href matches email prop', () => {
    const prop = 'email'
    const propDict = propDicts.filter(d => d.prop === prop)[0]
    expect(wrapper.find(`${propDict.selector}`).attributes().href).toMatch(propMocker(`${prop}`).propsData[`${prop}`])
  })
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
