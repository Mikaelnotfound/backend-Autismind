const { DataTypes } = require('sequelize');
const db = require('../DB/dbConnect').config;

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
    tableName: 'users', // Nome da tabela no banco de dados
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = User;