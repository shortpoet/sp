import * as myTest from '@/utils/myTest'
const { createWrapper, propsFinder } = myTest.default
import PDFSkillsRender from '@/components/Resume/PDF/PDFSkillsRender'
import { cloneDeep } from 'lodash'
// import icons from '@/assets/icons.js'

describe('PDFSkillsRender.vue', () => {

  const component = PDFSkillsRender

  let wrapper
  let mountOptions = propsFinder(['skills'])
  // this was throwing error because 'document' object not available 
  // unless explicitly calling this
  mountOptions.attachToDocument = true
  let expected

  const testWidths = [100, 768, 769, 984, 985]

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    expected = ``

  })

  const typeFilter = (type) => {
    if (type === 'Document Db') {
      type = 'Doc Db'
    } else if (type === 'Data Vizualization') {
      type = 'Data Viz'
    }
    return type
  }

  describe('element and class checks', () => {

    it('renders .pdf-skill-type div for each type of skill', () => {
      wrapper = createWrapper(component, mountOptions)

      mountOptions.propsData.skills.forEach((s, i) => {
        
        let type = typeFilter(s.type)

        expect(wrapper.find(`.pdf-skill-type-${i + 1}`).text()).toMatch(type)

      })
      
    })

    it('matches snapshot', () => {

      wrapper = createWrapper(component, mountOptions)
  
      expect(wrapper.html()).toMatchSnapshot()
  
    })

  })

  describe('screen check', () => {
    it('correctly calculates medum sized screens', () => {
      testWidths.forEach(tw => {
        window.innerWidth = tw
        wrapper = createWrapper(component, mountOptions)
        if(768 < tw && tw < 985) {
          expect(wrapper.vm.isMediumLarge).toBe(true)
        } else {
          expect(wrapper.vm.isMediumLarge).toBe(false)
        }
      })
    })
  })

})
