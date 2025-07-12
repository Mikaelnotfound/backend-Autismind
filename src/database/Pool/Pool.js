"use-strict";

const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

class PgPool {
    constructor() {
        if (!DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set.');
        }

        this.config = {
            connectionString: DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        };
        this.pool = null;
    }

    connect() {
        if (!this.pool) {
            this.pool = new Pool(this.config);
            this.pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err);
                process.exit(-1);
            });
            console.log('PostgreSQL connection pool created successfully.');
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
            console.log('PostgreSQL database connection pool closed.');
        }
    }
}

module.exports = new PgPool();
