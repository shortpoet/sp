import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import Start from '@/views/Start'
import {hardResume} from '@/assets/resume.js'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faFilePdf, faSave, faTimes, faRocket, faGrinTongueSquint} from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'
import StartButtonFloat from '@/components/Resume/Start/StartButtonFloat'
import fs from 'fs'
jest.useFakeTimers()

import { inspect } from 'util'
const $ = require('jquery')
jest.mock('jquery', () => jest.fn())
const collapse = jest.fn()
$.collapse = collapse

describe('Start.vue', () => {
  const component = Start
  // console.log(Object.keys(component))
  // console.log(component.methods)
  let propsData
  let computed
  let stubs
  let mocks
  const events =  ['click', 'touchstart', 'touchcancel', 'touchmove', 'touchend']

  let methods = {}
  
  let resumeStoreOptions
  let ignoredElements

  let mountOptions
  let wrapper
  let emmitted

  const mockEvents = [
    { target: {tagName: 'path',}, expected: false}, 
    { target: {tagName: 'div',}, expected: true}, 
    { target: {tagName: 'span',}, expected: true}, 
  ]

  // https://medium.com/@DavideRama/testing-global-event-listener-within-a-react-component-b9d661e59953
  // const map = {}
  // document.addEventListener = jest.fn((event, cb) => {
  //   map[event] = cb
  // })

  beforeEach(async () => {

    // https://github.com/testing-library/react-testing-library/issues/353#issuecomment-510074776
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'))
    }

    jest.resetModules()
    jest.clearAllMocks()

    library.add(
      faCircle, faFilePdf, faSave, faTimes, faRocket
    )

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers
    }
  
    propsData = { 
      // name: 'test name' 
    }

    computed = {
      // getResumeLoaded: () => true
    }


    mocks = {
      $: jest.fn(() => {
        return {
          click: jest.fn(),
          scrollspy: jest.fn(),
          collapse: jest.fn()
        }
      }),
      dispatch: jest.fn()
    }

    const getResumeLoaded = true

    resumeStoreOptions = { 
      getters: { getResumeLoaded: jest.fn(() => getResumeLoaded), getResume: jest.fn(() => hardResume) }, 
      mutations: { 'SET_RESUME_RAW': jest.fn() } 
    }

    ignoredElements = [
      // 'portal'
    ]

    mountOptions = { propsData, mocks, computed, stubs, ignoredElements }

    // mountOptions.attachToDocument = true

    wrapper = createWrapper(component, mountOptions, resumeStoreOptions)

  })
  describe('start.snapshots', () => {
    it('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  // fs.writeFile('window.json', inspect(window), (err) => {})
  // fs.writeFile('window.matchMedia.json', inspect(window.matchMedia), (err) => {})

  // TODO somehow test for latest resume
  // perhaps that's a backend test
  // would like to match hardresume file to 
  // chosen 'latest' version 

  describe('StartButtonFloat.vue', () => {

    it('toggles rippleExpanded to true when StartButtonFloat method open() is called and emits ripple-open and sets icon to pdf', async () => {

      // wrapper.find(StartButtonFloat).vm.$emit('ripple-open')
      wrapper.find(StartButtonFloat).vm.open()
      emmitted = wrapper.find(StartButtonFloat).emitted()
      await Vue.nextTick()

      expect(wrapper.vm.rippleExpanded).toBe(true)
      expect(emmitted).toMatchObject( {'ripple-open': [ [] ]} )
      expect(wrapper.find('.button-float-icon').attributes().class).toContain('pdf')
  
    })

    it('toggles rippleExpanded to false when StartButtonFloat method close() is called and emits ripple-close and sets icon to rocket', async () => {
      
      wrapper.setData({ rippleExpanded: true })
      await Vue.nextTick()
      wrapper.find(StartButtonFloat).vm.close()
      emmitted = wrapper.find(StartButtonFloat).emitted()
      await Vue.nextTick()
      
      expect(wrapper.vm.rippleExpanded).toBe(false)
      expect(emmitted).toMatchObject( {'ripple-close': [ [] ]} )
      expect(wrapper.find('.button-float-icon').attributes().class).toContain('rocket')
  
    })
    
    mockEvents.forEach(event => {
      
      it('emits ripple close when event target is not path aka not the icon', async () => {
        
        wrapper.setData({ rippleExpanded: true })
        await Vue.nextTick()
        wrapper.find(StartButtonFloat).vm.handleClickOutside(event)
        emmitted = wrapper.find(StartButtonFloat).emitted()
        await Vue.nextTick()
        if (event.expected === true) {
          expect(wrapper.vm.rippleExpanded).toBe(false)
          expect(emmitted).toMatchObject( {'ripple-close': [ [] ]} )
          expect(wrapper.find('.button-float-icon').attributes().class).toContain('rocket')
        } 
      })
      
    })

    describe('startbuttonfloat.document.eventlisteners', () => {

      it('adds events to the dom after one second wait', async () => {
                
        // option 1
        // https://stackoverflow.com/questions/54648402/how-to-mock-eventlistener-when-set-in-componentdidmount
        jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())

        // option 2
        // https://stackoverflow.com/questions/58951689/mocking-window-document-in-jest-and-vue-test-utils
        // const document = window.document
        // Object.defineProperty(document, 'addEventListener', {
        //   value: jest.fn()
        // })

        // more defineProperty example
        // https://stackoverflow.com/questions/58951689/mocking-window-document-in-jest-and-vue-test-utils

        let data = () => {
          return {
            rippleExpanded: true
          }
        }
        
        // let _mountOptions = { propsData, mocks, computed, stubs, ignoredElements, methods, data }
        let _mountOptions = { propsData, mocks, computed, stubs, ignoredElements }

        _mountOptions.attachToDocument = true
    
        let _wrapper = createWrapper(component, _mountOptions, resumeStoreOptions)

        // _wrapper.setData({ rippleExpanded: true })

        // await Vue.nextTick()

        jest.advanceTimersByTime(999)

        // let event = 'touchstart'

        // https://stackoverflow.com/questions/55738445/how-to-trigger-a-window-event-during-unit-testing-using-vue-test-utils
        // custom event 
        //  // https://stackoverflow.com/questions/52265387/vue-test-utils-window-scroll
        // document.dispatchEvent(new Event(event))

        // _wrapper.find('.container-fluid').trigger('touchstart')

        // console.log(_wrapper.vm.rippleExpanded)

        // option 1
        expect(document.addEventListener).not.toHaveBeenCalled()

        // option 2
        // expect(elementMock.addEventListener).toHaveBeenCalled()

        jest.advanceTimersByTime(1)
        expect(document.addEventListener).toHaveBeenCalled()

        _wrapper.destroy()

      })

      it('removes events from the dom when wrapper is destroyed', async () => {
        
        let removeEventListener =  jest.spyOn(document, 'removeEventListener').mockImplementation(() => jest.fn());
            
        let _mountOptions = { propsData, mocks, computed, stubs, ignoredElements }
  
        _mountOptions.attachToDocument = true
    
        let _wrapper = createWrapper(component, _mountOptions, resumeStoreOptions)
        
        _wrapper.destroy()
        let handleClickOutside = () => {}
        handleClickOutside =  handleClickOutside.bind(document)

        expect(document.removeEventListener).toHaveBeenCalled()

        let calls = events.map(e => {
          return [e, handleClickOutside]
        })

        // these have the funcs turned to null
        // let _expected = JSON.parse(JSON.stringify(removeEventListener.mock.calls))
        // let mockCalls = JSON.parse(JSON.stringify(calls))

        // console.log(removeEventListener.mock.calls)
        // console.log(calls)
        // saw SO answer that said sometimes an array can contain a random object at 
        // index -1 so
        // const arr = [1, 2]
        // arr[-1] = 'foo'
        // expect(arr).not.toEqual([1, 2]) 
        // console.log(Object.keys(removeEventListener.mock.calls))
        // console.log(Object.keys(calls))

        // this test fails on 
        // Received: serializes to the same string
        // when using toEqual or event toMatchObject or arrayContaining
        // https://github.com/facebook/jest/issues/8475

        // expect(removeEventListener.mock.calls).toEqual(expect.arrayContaining(calls))
        // expect(removeEventListener.mock.calls).toEqual(calls)
    
        let mockCallNames = removeEventListener.mock.calls.map(mc => mc[0])
        expect(mockCallNames).toEqual(events)
      })

    })
})

})
