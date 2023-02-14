// import * as myTest from '@/utils/myTest'
// const { createWrapper } = myTest.default

import routeMapper from '@/router/routeMapper'
import scrollBehavior from '@/router/scrollBehavior'
log('red', routeMapper)
import { log } from '@/utils/colorLog'
jest.mock('@/router/routeMapper')
jest.mock('@/router/scrollBehavior')

// import VueRouter from 'vue-router'
// import createMockRouterConfig from '@/router/createMockRouterConfig'
// import mockRouteMapper from '@/router/__mocks__/routeMapper'
// import mockScrollBehavior from '@/router/__mocks__/scrollBehavior'
// import paths from '@/router/paths.js'

// import App from '@/App'
// import Start from '@/views/Start'
// import PDF from '@/views/PDF'


// set up these tests before incorporating into mount to ensure mocks are set up correctly

describe('router.index', () => {
  describe('router.index.routeMapper', () => {
    it('returns paths object based on paths in paths file array', () => {
      const paths = [
        {
          path: '/',
          view: 'Start'
        },
        {
          path: '/about',
          name: 'AboutName',
          view: 'About'
        },
        {
          path: '/pdf',
          view: 'PDF'
        }
      ]
      const routes = routeMapper(paths)
      const expected = [
        {name: 'Start', path: '/',  component: jest.fn(resolve => jest.fn().then(resolve))},
        {name: 'AboutName', path: '/about',  component: jest.fn(resolve => jest.fn().then(resolve))},
        {name: 'PDF', path: '/pdf',  component: jest.fn(resolve => jest.fn().then(resolve))}
      ]
      // https://github.com/facebook/jest/issues/8475
      routes.forEach((route, i) => {
        expect(JSON.stringify(route)).toEqual(JSON.stringify(expected[i]))
      })
    })
  })
  describe('router.index.scrollBehavior', () => {
    it('returns paths object based on paths in paths file array', () => {
      const routes = [
        {
          to: { name: "Start", meta: {}, path: "/", hash: "#about", query: {}, params: {}, fullPath: "/", matched: [{}] },
          from: { name: "PDF", meta: {}, path: "/pdf", hash: "", query: {}, params: {}, fullPath: "/", matched: [{}] },
          savedPosition: null
        },
        {
          to: { name: "PDF", meta: {}, path: "/pdf", hash: "", query: {}, params: {}, fullPath: "/", matched: [{}] },
          from: { name: "Start", meta: {}, path: "/", hash: "", query: {}, params: {}, fullPath: "/", matched: [{}] },
          savedPosition: null
        },
        {
          to: { name: "Start", meta: {}, path: "/", hash: "", query: {}, params: {}, fullPath: "/", matched: [{}] },
          from: { name: "PDF", meta: {}, path: "/pdf", hash: "", query: {}, params: {}, fullPath: "/", matched: [{}] },
          savedPosition: {x: 88, y: 88}
        }
      ]
      const expected = [
        {selector: routes[0].to.hash},
        { x: 0, y: 0 },
        { x: 88, y: 88 }
      ]
      // https://github.com/facebook/jest/issues/8475
      // have to pass 3 params into scrollBehavior for it to work
      routes.forEach((route, i) => {
        expect(scrollBehavior(route.to, route.from, route.savedPosition)).toMatchObject(expected[i])
      })
    })
  })

  describe('router.navigation', () => {

    // // const routerConfig = createMockRouterConfig.createMockRouterConfig({
    // //   routes: routeMapper(paths),
    // //   scrollBehavior: scrollBehavior
    // // })
    // // const router = new VueRouter(routerConfig)

    // const routerOptions = {
    //   routes: routeMapper(paths),
    //   scrollBehavior: scrollBehavior
    // }

    // it('renders component after navigation', async () => {
    //   let wrapper = createWrapper(App, {routerOptions})

    //   // expect(wrapper.find(Start).exists()).toBe(true)
    //   // console.log(wrapper.vm.$router)
    //   wrapper.vm.$router.push('/pdf')

    //   await wrapper.vm.$nextTick()

    //   expect(wrapper.find(PDF).exists()).toBe(true)
    // })
  })
})