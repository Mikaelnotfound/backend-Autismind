"use-strict";

const mysql = require('mysql2/promise');
const dbConfig = require('../../env.js');

class Pool {
    constructor(dbConfig, mysqlModule) {
        this.mysql = mysqlModule;
        this.config = {
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
        this.pool = null;
    }

    connect() {
        if (!this.pool) {
            this.pool = this.mysql.createPool(this.config);
            console.log('Connection pool created successfully.');
        }
        return this.pool;
    }

    getPool() {
        if (!this.pool) {
            return this.connect();
        }
        return this.pool;
    }

    async disconnect() {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;
            console.log('Database connection pool closed.');
        }
    }
}

module.exports = new Pool(dbConfig, mysql);