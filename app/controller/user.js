const {Controller} = require('egg')

class UserController extends Controller {
  async list() {
    const {ctx, service} = this
    const {request} = ctx
    ctx.body = await service.user.list(request.query)
  }
  async levelCount() {
    const {ctx, service} = this
    const {request} = ctx
    ctx.body = await service.user.levelCount(request.query)
  }
  async latestTimeCount() {
    const {ctx, service} = this
    const {request} = ctx
    ctx.body = await service.user.latestTimeCount(request.query)
  }
}

module.exports = UserController
