/* eslint-disable */
const faker = require('faker');
const db = require('./connection');
const logger = require('../logger');
const config = require('../config');

const seedFunc = async (conn, count) => {
  let sql = 'INSERT INTO ...';

  await conn.query(sql);
};

(async () => {
  const conn = await db.getConnection();

  logger.info({ event: 'terminate' }, 'books seeding completed');
  process.kill(process.pid);
})();
