import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import StartButtonFloat from '@/components/Resume/Start/StartButtonFloat'
import { cloneDeep } from 'lodash'
// import icons from '@/assets/icons.js'
import { createLocalVue } from '@vue/test-utils'
import PortalVue from 'portal-vue'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faFilePdf, faSave, faTimes, faRocket} from '@fortawesome/free-solid-svg-icons'


describe('start.startButtonFloat', () => {

  const component = StartButtonFloat

  let methods = component.methods

  const LocalVue = createLocalVue()
  LocalVue.use(PortalVue)
  let wrapper

  let propsData

  let computed

  let stubs

  let mocks

  let ignoredElements

  let resumeStoreOptions

  let mountOptions = {
    propsData: {
      target: 'pdf-button-float',
      href: '/pdf',
      isExpanded: false
    },
    localVue: LocalVue
  }

  // mountOptions.attachToDocument = true
  let expected

  const events =  ['click', 'touchstart', 'touchcancel', 'touchmove', 'touchend']

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    expected = ``

    library.add(
      faCircle, faFilePdf, faSave, faTimes, faRocket
      )

    propsData = {}

    computed = {}

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers
    }

    ignoredElements = [
      // 'portal'
    ]

    mocks = {
      $: jest.fn(() => {
        return {
          click: jest.fn(),
          scrollspy: jest.fn()
        }
      }),
      dispatch: jest.fn()
    }
    
    resumeStoreOptions = { 
      getters: { getResumeLoaded: jest.fn(() => true), getResume: jest.fn(() => hardResume) }, 
      mutations: { 'SET_RESUME_RAW': jest.fn() } 
    }

    // wrapper = createWrapper(component, mountOptions, resumeStoreOptions)

  })

  

  describe('element and class checks', () => {

    it('renders correct icon - rocket when isExpanded is false', () => {
      // wrapper = createWrapper(component, mountOptions)

      // expect(wrapper.find('.button-float-icon').attributes().class).toContain('rocket')
    })
    it('renders correct icon - pdf when isExpanded is true', () => {
      // const _mountOptions = cloneDeep(mountOptions)
      // _mountOptions.isExpanded = true
      // wrapper = createWrapper(component, mountOptions)

      // expect(wrapper.find('.button-float-icon').attributes().class).toContain('pdf')
    })

    it('matches snapshot', () => {

      // wrapper = createWrapper(component, mountOptions)
  
      // expect(wrapper.html()).toMatchSnapshot()
  
    })

  })

  describe('startButtonFloat.lifecycle.hooks', () => {

    it('calls addEvents when mounted', () => {

      const mountedSpy = jest.spyOn(component, 'mounted')

      methods.addEvents = jest.fn()

      let _mountOptions = { propsData, mocks, computed, stubs, ignoredElements, methods}

      _mountOptions.attachToDocument = true
  
      let _wrapper = createWrapper(component, _mountOptions, resumeStoreOptions)
                      
      expect(mountedSpy).toHaveBeenCalled()

      expect(methods.addEvents).toHaveBeenCalled()
      
      _wrapper.destroy()
      
    })

    it('calls removeEvents when destroyed', () => {
      const destroyedSpy = jest.spyOn(component, 'destroyed')

      methods.removeEvents = jest.fn()

      let _mountOptions = { propsData, mocks, computed, stubs, ignoredElements, methods }

      _mountOptions.attachToDocument = true
  
      let _wrapper = createWrapper(component, _mountOptions, resumeStoreOptions)
              
      _wrapper.destroy()
      expect(destroyedSpy).toHaveBeenCalled()
      expect(methods.removeEvents).toHaveBeenCalled()
      
    })

  })
  
})
