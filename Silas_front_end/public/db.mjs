import mysqlPromise from '../node_modules/mysql2/promise.js';
import fs from 'fs';

  export async function connection() {
    const conn = await mysql.createConnection({
      host: '35.232.208.247',
      port: '3306',
      user: 'root',
      password: 'iamhackerman',
      database: 'discs',
    });
    return conn;
  }
  