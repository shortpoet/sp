
// created this to avoid circular import problem from using mocks folder auto-import
const createMockRouterConfig = (custom = { routes: [], scrollBehavior: () => {} }) => {
  return  {  
    mode: 'history',
    base: process.env.BASE_URL,
    routes: custom.routes,
    scrollBehavior: custom.scrollBehavior
  }
}

export default {
  createMockRouterConfig,
}