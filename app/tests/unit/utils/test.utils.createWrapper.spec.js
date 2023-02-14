import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import { cloneDeep } from 'lodash'

import factory from '@/utils/myTest/test.utils.factory'
import factoryShallow from '@/utils/myTest/test.utils.factoryShallow'

jest.mock('@/utils/myTest/test.utils.factory')
jest.mock('@/utils/myTest/test.utils.factoryShallow')


describe('test.utils.createWrapper', () => {
  // let factory
  beforeEach(() => {
    // factory = require('../../../src/utils/myTest/__mocks__/test.utils.factory').default
  })

  const component = {}

  const options = {
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

  let resumeStoreOptions = { 
    state: {}, 
    getters: {}, 
    mutations: {}, 
    actions: {} 
  }

  let isShallow

  // calling jest -t factory calls this test as well
  // didn't know that it matches it/test blocks as well
  it("calls createWrapper factory with a component and empty options and isShallow default to false", () => {

    createWrapper(component, options)

    expect(factory).toHaveBeenCalledWith(component, options)

  })
  it("calls createWrapper factory with a component and non-empty options and isShallow default to false", () => {
    const _options = cloneDeep(options)
    _options.propsData = {
      sampleProp: 'sample prop'
    }
    createWrapper(component, _options)

    expect(factory).toHaveBeenCalledWith(component, _options)

  })

  it("calls createWrapper factory with a component and empty options and empty resumeStoreOptions", () => {

    const _options = cloneDeep(options)
    let _resumeStoreOptions = cloneDeep(resumeStoreOptions)
    _resumeStoreOptions = {}
    isShallow = false

    createWrapper(component, _options, _resumeStoreOptions, isShallow)

    expect(factory).toHaveBeenCalledWith(component, _options)

  })
  it("calls createWrapper factory with a component and empty options and non-empty resumeStoreOptions", () => {

    const _options = cloneDeep(options)
    isShallow = false

    createWrapper(component, _options, resumeStoreOptions, isShallow)

    expect(factory).toHaveBeenCalledWith(component, _options)

  })
  it("calls createWrapper factoryShallow with a component and empty options and empty resumeStoreOptions", () => {

    const _options = cloneDeep(options)
    let _resumeStoreOptions = cloneDeep(resumeStoreOptions)
    _resumeStoreOptions = {}
    isShallow = true

    createWrapper(component, _options, _resumeStoreOptions, isShallow)

    expect(factoryShallow).toHaveBeenCalledWith(component, _options)

  })
  it("calls createWrapper factoryShallow with a component and empty options and non-empty resumeStoreOptions", () => {

    const _options = cloneDeep(options)
    isShallow = true

    createWrapper(component, _options, resumeStoreOptions, isShallow)

    expect(factoryShallow).toHaveBeenCalledWith(component, _options)

  })

})


