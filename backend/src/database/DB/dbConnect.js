const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
    process.env.DB_NAME || 'db_AutisMind',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
    }
);

async function connect() {
    try {
        await db.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        disconect();
    }
}

async function disconect() {
    try {
        await db.close();
        console.log('Connection to the database has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the database connection:', error);
    }
}


module.exports = { db, connect };