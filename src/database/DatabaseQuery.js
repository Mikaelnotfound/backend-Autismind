const pool = require('./Pool/Pool');

class DatabaseQuerys {
    constructor() {
        this.pool = pool;
    }

    async executeQuery(sql, value = []) {
        const pgPool = this.pool.getPool();
        if (!pgPool) {
            throw new Error('Database connection pool is not initialized or failed to connect');
        }

        let client;
        try {
            client = await pgPool.connect();
            try {
                const result = await client.query(sql, value);
                return result.rows;
            } finally {
                client.release();
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async executeTransaction(queries) {
        const pgPool = this.pool.getPool();
        if (!pgPool) {
            throw new Error('Database connection pool is not initialized or failed to connect');
        }

        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');
            for (const { sql, values } of queries) {
                await client.query(sql, values);
            }
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}

module.exports = DatabaseQuerys;
