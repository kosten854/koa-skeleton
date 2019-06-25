'use strict';

const pino = require('pino');
const config = require('./config/logger');

const logger = pino(config);

module.exports = logger;
