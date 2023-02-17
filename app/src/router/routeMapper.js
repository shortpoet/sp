export const routeMapper = function (paths) {
  // console.log('routeMapper');
  // console.log(paths);
  const out = paths.map(path => {
    return {
      name: path.name || path.view,
      path: path.path,
      component: resolve =>
        import(`@/views/${path.view}.vue`).then(resolve => {
          // console.log(path);
          // console.log(path.view);
          // console.log(resolve);
          return resolve;
        }),
      // component: path.view
      //   ? resolve => import(`@/views/${path.view}.vue`).then(resolve)
      //   : resolve =>
      //       import(`@/components/Articles/ArticleLayout.vue`).then(resolve),
      // component: path.view
      //   ? resolve =>
      //       import(`@/views/${path.view}.vue`).then(resolve => {
      //         console.log(path);
      //         console.log(path.view);
      //         console.log(resolve);
      //         return resolve;
      //       })
      //   : resolve =>
      //       import(`@/views/ArticleLayout.vue`).then(resolve => {
      //         console.log(path);
      //         console.log(path.view);
      //         console.log(resolve);
      //         return resolve;
      //       }),
      children: path.children ? routeMapper(path.children) : null,
      // children: () => (path.children ? routeMapper(path.children) : null)(),
      // children: () => {
      //   console.log('children');
      //   console.log(path);
      //   return path.children ? routeMapper(path.children) : null;
      // },
      props: path.props ? path.props : null,
      redirect: path.redirect ? path.redirect : null
    };
  });
  // catch-all route
  // .concat([{path: '*', redirect: '/resume'}])
  // console.log(out);
  return out;
};
export const mockRouteMapper = function (paths) {
  return paths.map(path => {
    return {
      name: path.name || path.view,
      path: path.path,
      component: resolve => import(`@/views/${path.view}.vue`).then(resolve)
    };
  });
  // catch-all route
  // .concat([{path: '*', redirect: '/resume'}])
};
