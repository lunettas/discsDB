import { Sequelize, Model, DataTypes } from 'sequelize';
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
  // ...
});

// Define models
class Disc extends Model {}

Disc.init({
  // Define the table's columns
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize,
  modelName: 'Disc',
  tableName: 'discs'
});


export { sequelize, Disc };
