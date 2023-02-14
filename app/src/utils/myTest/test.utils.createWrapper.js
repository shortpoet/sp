import { createLocalVue } from '@vue/test-utils'
import factory from './test.utils.factory'
import factoryShallow from './test.utils.factoryShallow'

// import VueRouter from 'vue-router'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'

import createStore from '@/store/createStore'
// import createMockRouterConfig from '@/router/createMockRouterConfig'
// import paths from '@/router/paths.js'

import { log } from '@/utils/colorLog'
export const createWrapper  = (
  component,
  /* istanbul ignore next */
  options = {},
  // but why don't i have to ignore the empty  or even unprovided resumeStoreOtions
  // might need to figure this out but setting params to ignore for now
  resumeStoreOptions = {},
  // routerOptions = {},
  isShallow = false,
  ) => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(PortalVue)
    const mockStoreResume = createStore.createMocks().createStoreResumeMocks(resumeStoreOptions)
    const storeConfig = createStore.createMocks({modules: {resume: mockStoreResume}})

    // Using router is untested makes tests fail
    // and just doesn't work for now
    // localVue.use(VueRouter)
    // const routerConfig = createMockRouterConfig.createMockRouterConfig(routerOptions)
    // const router = new VueRouter(routerConfig)

    // log('green', mockStoreResume)
    // log('yellow', storeConfig.modules.resume)
    const store = new Vuex.Store(storeConfig)
    // log('red', store)
    // log('blue', store._mutations['resume/SET_RESUME_RAW'][0]())
    // console.log(options)
    return isShallow ? 
    factoryShallow(component, {
      localVue,
      store,
      // router,
      ...options
    }) : 
    factory(component, {
      localVue,
      store,
      // router,
      ...options
    })
}

// export default createWrapper
// when this was set to export default a console log(createWrapper) that was in
// test.utils.textMatcher line 19 was being executed from every module that called createWrapper
module.exports = createWrapper