const { DataTypes } = require('sequelize');
const { db } = require('../DB/dbConnect');
const Historical = require('./Historical');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


// Define the relationship between User and Historical
// A User can have many Historical records
User.hasMany(Historical, {foreignKey: 'userId'});
Historical.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;