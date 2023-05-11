// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('mysql://dbu195808:CbSH8U*A$HAzMY3@db5012977672.hosting-data.io:3306/dbs10897521');

// export async function connection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     return sequelize;
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     throw error; 
//   }
// }
import { Sequelize } from 'sequelize';

const host = 'db5012977672.hosting-data.io';
const database = 'dbs10897521';
const username = 'dbu195808';
const password = 'CbSH8U*A$HAzMY3';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql'
});

export async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL server successfully established.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; 
  }
}

// import { createConnection } from 'mysql2/promise';
//   export async function connection() {
//     const conn = await mysql.createConnection({
//       host: '35.232.208.247',
//       port: '3306',
//       user: 'root',
//       password: 'iamhackerman',
//       database: 'discs',
//     });
//     return conn;
//   }
  