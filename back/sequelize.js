const { Sequelize } = require('sequelize');

// Replace 'your_database', 'your_username', 'your_password' with your actual database details
const sequelize = new Sequelize('mydb', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
