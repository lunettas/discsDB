import { Sequelize} from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access the environment variables
const host = process.env.HOST;
const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// Use the variables to establish a connection
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
});
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
(async () => {
  try {
    await sequelize.sync({ force: true });//remove this force true for deployment
    console.log('User table created successfully.');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
})();



export { sequelize, User};
