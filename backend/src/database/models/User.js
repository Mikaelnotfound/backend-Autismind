const { DataTypes } = require('sequelize');
const db = require('../DB/dbConnect').config;
const Historical = require('./Historical.js'); // Import the Historical model


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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    tableName: 'Users', // Define explicitamente o nome da tabela
});

User.hasOne(Historical, {
    foreignKey: 'userId', // Ensure this matches the column in Historical
    sourceKey: 'id', // Ensure this matches the primary key in User
    as: 'historical' // Optional: Alias for the association
});

Historical.belongsTo(User, {
    foreignKey: 'userId', // Ensure this matches the column in Historical
    targetKey: 'id', // Ensure this matches the primary key in User
    as: 'user' // Optional: Alias for the association
});

module.exports = User;