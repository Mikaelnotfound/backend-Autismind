const { Sequelize } = require('sequelize');
require('dotenv').config();


/**
 * * Database connection configuration
 * @typedef {Object} DBConfig
 * @property {string} DB_NAME - Database name
 * @property {string} DB_USER - Database user
 * @property {string} DB_PASSWORD - Database password
 * @property {string} DB_HOST - Database host
 * @property {string} DB_DIALECT - Database dialect (e.g., mysql, postgres, sqlite, etc.)
 * requires dotenv to load environment variables from a .env file
 * @requires sequelize - Sequelize ORM for Node.js
 * connects to a MySQL database using Sequelize
 * @example
 * const { db, connect } = require('./dbConnect');
 * connect();
 */


class DB {
    constructor() {
        this.config = new Sequelize(
            process.env.DB_NAME || 'db_AutisMind',
            process.env.DB_USER || 'root',
            process.env.DB_PASSWORD || '',
            {
                host: process.env.DB_HOST || 'localhost',
                dialect: process.env.DB_DIALECT || 'mysql',
            }
        );
    }


    async connect() {
        try {
            await this.config.authenticate();
            console.log('Connection to the database has been established successfully.');
            await this.config.sync({ alter: true });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            this.disconect();
        }
    }
    
    async disconect() {
        try {
            await this.config.close();
            console.log('Connection to the database has been closed successfully.');
        } catch (error) {
            console.error('Unable to close the database connection:', error);
        }
    }
    
}

module.exports = new DB();