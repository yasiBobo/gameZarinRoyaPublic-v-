// In User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('user_data', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mistakes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  rightClicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  played_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: false, // This line removes createdAt and updatedAt columns
});

module.exports = User;
