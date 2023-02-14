// const routeMapper = jest.genMockFromModule('@/router/routeMapper')

console.log('hello from routeMapper mock module')

const routeMapper = function(paths) {
  return paths
    .map(path => {
      return {
        name: path.name || path.view,
        path: path.path,
        component: jest.fn(resolve => jest.fn().then(resolve))
      }
    })
    // catch-all route
    // .concat([{path: '*', redirect: '/resume'}])
}

module.exports = routeMapper