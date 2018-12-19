'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    username: 'swk',
    password: 'lm8989fd',
    database: 'danmu',
    host: '127.0.0.1',
    port: 3306,
    timezone: '+08:00'
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE'
  }

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '0.0.0.0'
    }
  }
  return config;
};
