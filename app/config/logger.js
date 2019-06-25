'use strict';

const { env, name } = require('.');

const config = {
  enabled: process.env.LOG_ENABLED || ['production', 'development'].includes(env),
  name,
  level: process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'debug'),
  timestamp: false
};

module.exports = config;
