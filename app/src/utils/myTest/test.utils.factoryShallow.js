import { shallowMount } from '@vue/test-utils'

export const factoryShallow = (
  component, 
  /* istanbul ignore next */
  options = {
    propsData: {},
    localVue: {},
    mocks: {},
    store: {},
    // context: {}, // only for functional components
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
    return shallowMount(component, options)
  }

module.exports = factoryShallow