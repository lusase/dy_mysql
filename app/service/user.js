const {Service} = require('egg')
const _ = require('lodash')
const moment = require('moment')

function toFilter(filters = '{}') {
  if (typeof filters === 'string') filters = JSON.parse(filters)
  return Object.keys(filters).reduce((obj, key) => {
    if (!_.isEmpty(filters[key])) obj[key] = {in: filters[key]}
    return obj
  }, {})
}

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.session = ctx.session
    this.User = ctx.model.User
    this.ResCode = ctx.response.ResCode
    this.Res = ctx.response.Res
  }
  async list({current = 1, pageSize = 10, filters = '{}', field = 'id', order = 'desc'} = {}) {
    const {User} = this.ctx.model
    const {count, rows} = await User.findAndCount({
      order: [[field, order]],
      limit: Number(pageSize),
      offset: Number(current - 1) * Number(pageSize),
      where: {
        ...toFilter(filters)
      }
    })
    if (!rows.length) return this.Res.createBySuccessMsg('未查到相关用户')
    const list = rows.map(row => row && row.toJSON())
    return this.Res.createBySuccessList(list, count)
  }

  async levelCount(query) {
    const {model} = this.ctx.app
    let sql
    let res
    if (query && query.start && query.end) {
      sql = 'SELECT t.u_level, COUNT(0) as count FROM (SELECT u_level FROM dy_user WHERE latest_time BETWEEN ? AND ?) AS t GROUP BY t.u_level ORDER BY t.u_level asc'
      res = await model.query(sql, {
        replacements: [query.start, query.end]
      })
    } else {
      sql = 'SELECT t.u_level,COUNT(0) as count FROM dy_user as t GROUP BY t.u_level ORDER BY t.u_level ASC'
      res = await model.query(sql)
    }
    return this.Res.createBySuccessData(res[0])
  }

  async latestTimeCount(query = {}) {
    const {model} = this.ctx.app
    const {start, end} = query
    if (start && end) {
      const sql = 'SELECT COUNT(0) count,t.latest_date FROM dy_user t WHERE t.latest_date >= ? and t.latest_date <= ? GROUP BY t.latest_date'
      const res = await model.query(sql, [start, end])
      return this.Res.createBySuccessData(res[0])
    } else {
      const sql = 'SELECT COUNT(0) count,t.latest_date FROM dy_user t GROUP BY t.latest_date'
      const res = await model.query(sql)
      return this.Res.createBySuccessData(res[0])
    }
  }
}

module.exports = UserService