import * as myTest from '@/utils/myTest'
const { propsFinder, createWrapper } = myTest.default
import StartAwards from '@/components/Resume/Start/StartAwards'
import recase from '@/utils/recase.js'

describe('StartAwards.vue', () => {

  const component = StartAwards
  const props = Object.keys(component.props)
  let prop
  let selector
  let mockProp = false
  const wrapper = createWrapper(component, propsFinder(props))

  beforeEach(() => {

  })

  it('renders awards h2', () => {

    // hard coded header
    expect(wrapper.find("h2").text()).toMatch("Natural Languages")

  })
  const {propsData} = propsFinder(props)
  const languageTypes = propsData.spokenLanguages.map(l => l.type)

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
    
    expect(wrapper.html()).toMatchSnapshot()

  })

})
