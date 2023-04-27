import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('discs', 'root', 'iamhackerman', {
  host: '35.232.208.247',
  dialect: 'mysql',
});

export async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
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
  