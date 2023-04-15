import mysql from 'mysql2';
import fs from 'fs';

// connect to mySQL
export const localHostConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'iamhackerman',
    database: 'discs',
  });

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
  

//gcloud sql users set-password root --instance=[discs] --password=[NEW_PASSWORD]
//GRANT ALL PRIVILEGES ON discs TO 'root'@'75.70.54.119' IDENTIFIED BY 'iamhackerman';

//GRANT ALL PRIVILEGES ON discs.* TO 'root'@'75.70.54.119' IDENTIFIED BY 'iamhackerman';