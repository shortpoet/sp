import * as myTest from '@/utils/myTest'
const { textMatcherFactory, createWrapper, propsMocker, propMocker } = myTest.default

import PDFAbout from '@/components/Resume/PDF/PDFAbout'
import { cloneDeep } from 'lodash'

describe('PDFAbout.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  const component = PDFAbout
  // const props = Object.keys(component.props)
  const propDicts = [
    {prop: 'name', selector: 'h2'},
    {prop: 'surname', selector: '#pdf-surname'},
    {prop: 'flags', selector: '#pdf-flags'},
    {prop: 'email', selector: 'a'},
    {prop: 'address', selector: '#pdf-address'},
    {prop: 'visas', selector: '#pdf-visas'},
  ]
  let mockProp = true
  
  const props = propDicts.map(d => d.prop)
  
  let propsObject = propsMocker(props)

  propsObject.propsData['socials'] = [        
    {
      provider: 'github',
      url: 'github',
    },
    {
      provider: 'linkedin',
      url: 'linkedin',
    },
    {
      provider: 'instagram',
      url: 'instagram',
    },
    {
      provider: 'twitter',
      url: 'twitter',
    },
    {
      provider: 'website',
      url: '/',
    }
  ]

  console.log(propsObject)

  let wrapper = createWrapper(component, propsObject)

  propDicts.forEach(dict => {
    it(`renders interests ${dict.selector} that matches ${dict.prop} prop`, () => {
      expect(wrapper.find(`${dict.selector}`).text()).toMatch(propMocker(`${dict.prop}`).propsData[`${dict.prop}`])
    })  
  })

  it('email href matches email prop', () => {
    // interesting that although snapshot includes deeply mounted child (pdfsocials)
    // the wrapper doesn't find those elements
    const prop = 'email'
    const propDict = propDicts.filter(d => d.prop === prop)[0]
    expect(wrapper.find(`${propDict.selector}`).attributes().href).toMatch(propMocker(`${prop}`).propsData[`${prop}`])
  })

  it('renders photo', () => {

    expect(wrapper.find("img").exists()).toBe(true)

  })

  it('matches snapshot', () => {

    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.renderPDF = false

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()
    
  })

  it('matches renderPDF snapshot', () => {

    let _propsObject = cloneDeep(propsObject)
    _propsObject.propsData.renderPDF = true

    wrapper = createWrapper(component, _propsObject)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
