const { dbConfig } = require('../config');
const mysql = require('mysql2/promise');

const db = mysql.createPool(dbConfig);
module.exports = db;
