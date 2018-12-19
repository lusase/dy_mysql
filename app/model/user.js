const moment = require('moment')

module.exports = app => {
  const {STRING, INTEGER, DATE} = app.Sequelize

  const User = app.model.define('dy_user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    u_id: INTEGER,
    u_name: STRING,
    u_level: INTEGER,
    chat_cnt: INTEGER,
    free_gift_cnt: INTEGER,
    consumption: INTEGER,
    latest_time: {
      type: DATE,
      get() {
        return moment(this.getDataValue('latest_time')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    noble_level: INTEGER
  }, {
    timestamps: false,
    tableName: 'dy_user'
  })

  return User
}

