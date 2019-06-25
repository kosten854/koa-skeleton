'use strict';

const os = require('os');
const pkginfo = require('../../package.json');
const spec = require('../spec');

exports.getApiInfo = ctx => {
  // BUSINESS LOGIC
  const environments = {
    nodeVersion: process.versions['node'],
    hostname: os.hostname(),
    platform: `${process.platform}/${process.arch}`
  };
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    environments
  };

  ctx.body = data;
};

exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};

exports.healthcheck = ctx => {
  // TODO: Improve healthcheck logic
  // status: ['pass', 'fail', 'warn']
  const data = {
    status: 'pass'
  };
  ctx.body = data;
};
