import router from './router'
// import hasToken from './utils/token'

router.beforeEach(async (to, from, next) => {
  next()
  // if (hasToken()) {
  //   if (to.path === '/login' || to.path === '/register') {
  //     next({
  //       path: '/'
  //     })
  //   }
  // } else {
  //   if (to.path === '/register' || to.path.split('/')[1] === 'verify-email') {
  //     next({
  //       path: to.path
  //     })
  //   } else {
  //     var redirect_path = '/login?message=You need to login to access the platform.';
  //     var encoded = encodeURI(redirect_path);
  //     next({
  //       path: encoded
  //     })

  //   }
  // }
})