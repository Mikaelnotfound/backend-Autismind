const {DataTypes} = require('sequelize');
const {db} = require('../DB/dbConnect');


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
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Historical;