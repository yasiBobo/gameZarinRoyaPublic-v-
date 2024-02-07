// In User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personal_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  login_time: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Set a default value to the current timestamp
  },
}, {
  timestamps: false, // This line removes createdAt and updatedAt columns
});

module.exports = Users;
