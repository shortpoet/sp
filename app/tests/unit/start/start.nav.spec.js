import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import StartNav from '@/components/Resume/Start/StartNav'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
const chalk = require('chalk')
require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

const {$} = require('jquery')
// require('bootstrap')
// const jMock = jest.mock('jquery', () => jest.fn())
// const $ = jest.fn()
// jMock.$ = $
// const collapse = jest.fn()
// jMock.$.collapse = collapse

const testWidths = [400, 900, 1000]

const mediaQueries = [
  "(max-width: 768px)",
  "(min-width: 768px)",
  "(max-width: 992px)",
  "(min-width: 992px)",
  // "screen and (max-width: 768px)",
  // "screen and (min-width: 768px)",
  // "screen and (max-width: 992px)",
  // "screen and (min-width: 992px)",
  // "screen and (min-height: 600px)",
  // "screen and (max-height: 400px)",
  // "screen and (orientation: landscape)",
  // "(min-resolution: 150dpi)",
  // "(max-resolution: 72dpi)"
]

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
}


describe('StartNav.vue', () => {
  const component = StartNav
  // console.log(Object.keys(component))
  // console.log(component.methods)
  let propsData
  let computed
  let stubs
  let mocks

  let methods = {}
  
  let resumeStoreOptions
  let ignoredElements

  let mountOptions
  let wrapper
  let emmitted


  beforeEach(async () => {

    // Object.defineProperty(window, 'matchMedia', {
    //   writable: true,
    //   value: jest.fn().mockImplementation(query => ({
    //     matches: false,
    //     media: query,
    //     onchange: null,
    //     addEventListener: jest.fn(),
    //     removeEventListener: jest.fn(),
    //     dispatchEvent: jest.fn(),
    //   })),
    // });    

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

    propsData = { 
      // name: 'test name' 
    }

    computed = {
      // getResumeLoaded: () => true
    }

    stubs = {
    }

    mocks = {
      $: jest.fn(() => {
        return {
          click: jest.fn(),
          scrollspy: jest.fn(),
          collapse: jest.fn()
        }
      }),
      // collapse: jest.fn()
    }

    resumeStoreOptions = { 
    }

    ignoredElements = [
      // 'portal'
    ]

    mountOptions = { propsData, mocks, computed, stubs, ignoredElements }

    // mountOptions.attachToDocument = true

    wrapper = createWrapper(component, mountOptions, resumeStoreOptions)

  })
  describe("start.nav.mediaQueries", () => {

  

    // https://stackoverflow.com/questions/57167525/how-to-set-media-queries-with-jest
    testWidths.forEach(tw => {

      mediaQueries.forEach(mq => {
  
  
        window.matchMedia = media => ({
          addListener: () => {},
          removeListener: () => {},
          // matches: media === '(min-width: 545px)',
          matches: media === mediaQueries[2],
        });
  
        // window.matchMedia = jest.fn().mockImplementation(query => {
        //   return {
        //     matches: query === '(min-width: 240px) and (max-width: 767px)' ? false:true ,
        //     media: '',
        //     onchange: null,
        //     addListener: jest.fn(),
        //     removeListener: jest.fn(),
        //   };
        // });
        it(`doesn't display pic at media query below 992px ${mq}`, async () => {      
          // window.matchMedia = jest.fn(() => {
          //   return {
          //     matches: true,
          //     addEventListener: jest.fn(),
          //     removeEventListener: jest.fn()
          //   }
          // })
          // console.log(window.matchMedia(mq))
          window.matchMedia(mq)
          // window.resizeTo(tw, 800)
          wrapper = createWrapper(component, mountOptions, resumeStoreOptions)
          resizeWindow(tw, 800)
          // window.matchMedia(mediaQueries[3])
          // global.window.innerWidth = tw
          // global.window.dispatchEvent(new Event('resize'))
          await Vue.nextTick()
          if (matchMedia(mq).matches) {
            // console.log(chalk.red(`it's a match for ${mq}`))
            // console.log(window.innerWidth)
          }
          expect(wrapper.html()).toMatchSnapshot()
          // if (tw < 993) {
          //   console.log(tw)
          //   console.log(wrapper.find('.d-lg-block'))
          //   expect(wrapper.find('.d-lg-block')).not.toBeTruthy()
          // }
        })
      })
    })
  })

  describe('startnav.collapsed', () => {
    it('calls collapse', async () => {
      // const spy = jest.spyOn(StartNav.methods, 'collapse')
      // const collapse = jest.fn()
      const _wrapper = mount(StartNav)
      // _wrapper.setMethods({collapse: collapse})
  
      // expect(wrapper).toMatchSnapshot()
      console.log(wrapper.vm.isCollapse)
      const button = wrapper.find('.nav-item')
      await button.trigger('click')
      // console.log(wrapper.vm.isCollapse)
      expect(wrapper.vm.isCollapse).toBe(true)
      // expect(collapse).toHaveBeenCalled()
  
    })
  
    it('closes responsive menu when a link is clicked', async () => {

      // // window.resizeTo(400, 600)
      // // window.resizeTo(1200, 800)
      
      // let toggler = wrapper.find('.navbar-toggler')
      
      // // expect(toggler.isVisible()).toBe(true)

      // // expect(wrapper.find('p')).toBe(false)

      // console.log(wrapper.vm.isCollapse)
      // // wrapper.find('li.nav-item').trigger('click')
      // const button = wrapper.find('button')
      // console.log(button)
      // button.trigger('click')
      // console.log(wrapper.vm.isCollapse)
      // // let el = $('a.js-scroll-trigger')
      // // console.log(el)
      // // console.log($.fn)
      // // console.log($.fn.collapse)
      
      // // wrapper.find('a.js-scroll-trigger[href*="#"]:not([href="#"])').trigger('click')
      // // const collapseSpy = jest.spyOn(el, 'collapse').mockImplementation(() => jest.fn())
      
      // // console.log($)
      // // console.log(Object.keys($))
      // // console.log($['fn'])
      // // console.log(component.methods)
      // // const collapseSpy = jest.spyOn(component.methods, 'collapse').mockImplementation(() => jest.fn())
      // const collapse = jest.fn()
      // wrapper.setMethods({collapse: collapse})
      
      // // el.click()
      // const p = wrapper.find('p')
      // console.log(p)
      // expect(p.text()).toMatch('Test')
      // // use snapshot to inspect click action
      // expect(wrapper.html()).toMatchSnapshot()

      // expect(collapse).toHaveBeenCalled()

    })



    it('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

  })

})
