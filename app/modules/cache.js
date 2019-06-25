const NodeCache = require('node-cache');
const { cacheConfig } = require('../config');

const cache = new NodeCache({
  stdTTL: cacheConfig.ttl,
  checkperiod: cacheConfig.ttl * 0.2,
  useClones: true
});

module.exports.get = async key => {
  const value = await cache.get(key);
  return value || null;
};
module.exports.set = async (key, value) => {
  await cache.set(key, value);
};
