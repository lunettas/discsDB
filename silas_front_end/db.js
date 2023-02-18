const mysql = require('mysql2/promise');

// connect to mySQL
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'iamhackerman',
    database: 'discs',
  });

  module.exports = connection;
