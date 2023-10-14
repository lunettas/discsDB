import { Sequelize} from 'sequelize';
import { HOST, DATABASE, USERNAME, PASSWORD } from './config.mjs'; 

// Use the variables to establish a connection
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});
const User = sequelize.define('Users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  permission: {
    type: Sequelize.ENUM('regular', 'admin'),
    allowNull: false,
    defaultValue: 'regular'
  },
  resetCode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetCodeExpiration: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

(async () => {
  try {
    await sequelize.sync();
    
  } catch (error) {
    console.error('Error syncing user table:', error);
  }
})();



export { sequelize, User};


// dev tool for making new Users table await sequelize.sync({force:true});