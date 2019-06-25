'use strict';

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'koa-test-project',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 7070,
    dbConfig: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: process.env.DB_POOL
    },
    cacheConfig: { ttl: process.env.CACHE_TTL || 100 }
  },
  production: {
    port: process.env.APP_PORT || 7071
  },
  development: {
    seedCount: process.env.SEED_COUNT || 1000000
  },
  test: {
    port: 7072
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
