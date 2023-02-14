import { enableAutoDestroy } from '@vue/test-utils'
import * as myTest from '@/utils/myTest'
const { createWrapper, propsFinder } = myTest.default
import PDFAwards from '@/components/Resume/PDF/PDFAwards'
import recase from '@/utils/recase.js'
import { cloneDeep } from 'lodash'

describe('StartAwards.vue', () => {

  const component = PDFAwards
  const props = Object.keys(component.props)
  let prop
  let selector
  let mockProp = false
  // using real props to test icon class names and nested // computed values
  // by transforming it to the shape the component expects, it renders the values in 
  // snapshot. 
  const propsObject = propsFinder(props)
  const {propsData} = propsObject
  // console.log(propsObject)
  // console.log(propsData)
  const languageTypes = propsData.spokenLanguages.map(l => l.type)

  let wrapper = createWrapper(component, {propsData})

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders awards h4', () => {

    // hard coded header
    expect(wrapper.find("h4").text()).toMatch("Natural Languages")

  })

  let iconClass
  let spanText

  languageTypes.forEach(type => {
    it(`renders language icons that match spoken languages - ${type} - types/levels prop`, () => {
      // match first word and recase camel to capitalize and add space
      iconClass = recase(wrapper.find(`i.${type}`).attributes().class.match(/^\w+/)[0])
      // match wordSSS .+ vs \w+ within parentheses
      spanText = wrapper.find(`i.${type} ~ span`).text().match(/\((.+)\)/)[1]
      expect(iconClass).toContain(spanText)
    })  
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
