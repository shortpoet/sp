import { mount } from '@vue/test-utils'

jest.mock('@vue/test-utils')

describe('test.utils.factory', () => {
  let factory
  beforeEach(() => {
    factory = require('@/utils/myTest/test.utils.factory')
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

  it("calls vue-test-utils mount with a component and options object", () => {

    factory(component, mountOptions)

    expect(mount).toHaveBeenCalledWith(component, mountOptions)

  })
})



