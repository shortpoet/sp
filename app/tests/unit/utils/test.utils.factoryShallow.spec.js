import { shallowMount } from '@vue/test-utils'

jest.mock('@vue/test-utils')

describe('test.utils.factoryShallow', () => {
  let factoryShallow
  beforeEach(() => {
    factoryShallow = require('@/utils/myTest/test.utils.factoryShallow')
  })

  const component = {}
  const mountOptions = {
    propsData: {},
    localVue: {},
    mocks: {},
    store: {},
    context: {}, // only for functional components
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
  }

  it("calls vue-test-utils shallowMount with a component and options object", () => {

    factoryShallow(component, mountOptions)

    expect(shallowMount).toHaveBeenCalledWith(component, mountOptions)

  })
})



