const { DataTypes } = require('sequelize');
const db = require('../DB/dbConnect').config;

/**
 * Historical model definition
 * @typedef {Object} Historical
 * @property {number} id - Historical ID
 * @property {string} phrase - Historical phrase
 * @property {Date} createdAt - Historical creation date
 * @property {number} userId - User ID for historical data
 */

const Historical = db.define('Historical', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phrase: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
});


module.exports = Historical;