import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import { cloneDeep } from 'lodash'
// even just importing throws the error
import PDF from '@/views/PDF'
import {hardResume} from '@/assets/resume.js'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faFilePdf, faSave, faTimes, faRocket} from '@fortawesome/free-solid-svg-icons'
import PDFSkillsRender from '@/components/Resume/PDF/PDFSkillsRender'
import PDFSkills from '@/components/Resume/PDF/PDFSkills'
import PDFButtonFloat from '@/components/Resume/PDF/PDFButtonFloat'

import { log } from '@/utils/colorLog'
describe('PDF.vue', () => {
  const component = PDF
  // console.log(Object.keys(component))
  // console.log(component.methods)
  let propsData
  let computed
  let stubs
  let mocks
  const events =  ['click', 'touchstart', 'touchcancel', 'touchmove', 'touchend']

  let methods = {}
  
  let resumeStoreOptions
  const getResumeLoaded = true

  let ignoredElements

  let mountOptions
  let wrapper
  let emmitted

  beforeEach(async () => {

    library.add(
      faCircle, faFilePdf, faSave, faTimes, faRocket
    )
      
    propsData = { 
      // name: 'test name' 
    }

    computed = {
      // getResumeLoaded: () => true
    }

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers
    }

    mocks = {
      dispatch: jest.fn()
    }

    resumeStoreOptions = { 
      getters: { getResumeLoaded: jest.fn(() => getResumeLoaded), getResume: jest.fn(() => hardResume) }, 
      mutations: { 'SET_RESUME_RAW': jest.fn() } 
    }

    mountOptions = { propsData, mocks, computed, stubs }

    jest.resetModules()
    jest.clearAllMocks()


  })

  describe('pdf.methods.toPDF', () => {
    it('sets renderPDF to the value of the event - this is to reset the layout of the page for paginated pdf', () => {
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions)
      expect(wrapper.vm.renderPDF).toBeFalsy()

      // method 1
      wrapper.find(PDFButtonFloat).vm.$emit('to-render-pdf', true)
      
      // method 2
      // doesn't seem to chain down this way
      // wrapper.find('.btn-page').trigger('click')
      // log('green', wrapper.find('.btn-page').text())

      expect(wrapper.vm.renderPDF).toBeTruthy()
    })
  })
  
  describe('pdf.regular', () => {
    it('matches hard resume snapshot with renderPDF defualting to false', () => {

      wrapper = createWrapper(component, mountOptions, resumeStoreOptions)

      expect(wrapper.vm.renderPDF).toBe(false)
  
      expect(wrapper.html()).toMatchSnapshot()
  
    })
    it('correctly renders styleObject', () => {

      let expected = [
        `font-family: Saira Extra Condensed, Open Sans;`
      ]

      expected = expected.join(' ')

      expect(wrapper.find('.pdf-container').attributes().style).toMatch(expected)

    })

    it('renders PDFSkills dynamic component :is using skillComp computed prop', () => {
      const localThis = { renderPDF: false }
      expect(wrapper.find('.skill-grid')).toBeTruthy()
      expect(component.computed.skillComp.call(localThis)).toBe('PDFSkills')
      expect(wrapper.find(PDFSkills).exists()).toBe(true)
    })
  })

  describe('pdf.renderPDF', () => {

    const data = () => {
      return {
        renderPDF: true
      }
    }
    // resume store options were undefined unless explicitly redefined here
    // have to verify if this is the case in other tests
    resumeStoreOptions = { 
      getters: { getResumeLoaded: jest.fn(() => getResumeLoaded), getResume: jest.fn(() => hardResume) }, 
      mutations: { 'SET_RESUME_RAW': jest.fn() } 
    }
    
    // same thing happened with fontawesome hmmm
    // it's like beforeEach wasn't working right
    library.add(
      faCircle, faFilePdf, faSave, faTimes, faRocket
    )

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers
    }

    let _mountOptions = { propsData, mocks, computed, stubs, data }

    let _wrapper = createWrapper(component, _mountOptions, resumeStoreOptions)

    it('matches hard resume snapshot with renderPDF set to true', () => {
 
      expect(_wrapper.vm.renderPDF).toBe(true)
  
      expect(_wrapper.html()).toMatchSnapshot()
      
    })
    it('correctly renders styleObject', () => {

      let expected = [
        `font-family: Saira Extra Condensed, Open Sans;`,
        `width: 210mm;`,
        `height: 297mm;`,
        `margin-left: auto;`,
        `margin-right: auto;`
      ]

      expected = expected.join(' ')

      expect(_wrapper.find('.pdf-container').attributes().style).toMatch(expected)

    })

    it('renders PDFSkillsRender dynamic component :is using skillComp computed prop', () => {
      const localThis = { renderPDF: true }
      expect(_wrapper.find('.skill-grid-render')).toBeTruthy()
      expect(component.computed.skillComp.call(localThis)).toBe('PDFSkillsRender')
      expect(_wrapper.find(PDFSkillsRender).exists()).toBe(true)
    })

  })
})
