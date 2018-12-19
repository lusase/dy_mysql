'use strict'
module.exports = app => {
  const {router, controller} = app
  router.get('/user/list', controller.user.list)
  router.get('/user/levelCount', controller.user.levelCount)
  router.get('/user/latestTimeCount', controller.user.latestTimeCount)
}