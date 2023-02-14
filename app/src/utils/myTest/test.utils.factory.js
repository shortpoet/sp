import { mount } from '@vue/test-utils'
import { log } from '@/utils/colorLog'
export const factory = (
  component, 
  /* istanbul ignore next */
  options = {
    propsData: {},
    localVue: {},
    mocks: {},
    store: {},
    // context: {}, // only for functional components
    // this only breaks when testing
    // probably should comment out of real func (which this is (now) hehe)
    router: {},
    computed: {},
    stubs: {},
    slots: {},
    scopedSlots: {},
    attrs: {},
    attachToDocument: false,
    attachTo: null, //HTML Element or String
    listeners: {},
    parentComponent: {},
    provide: {}
  }) => {
    // console.log(options)
    // console.log(options.mocks)
    // console.log(options.store)
    // console.log(options.localVue)
    // log('blue', options.stubs)
    // log('green', options.propsData)
    // console.log(mount)
    return mount(component, options)
  }

module.exports = factory

// export default factory