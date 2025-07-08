const pool = require('./Pool/Pool');

class DatabaseQuerys {
    constructor() {
        this.pool = pool;
    }

    async executeQuery(sql, value = []) {
        if (!this.pool.pool) {
            throw new Error('Database connection pool is not initialized');
        }

        try {
            const connection = await this.pool.pool.getConnection();
            try {
                const [rows] = await connection.execute(sql, value);
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

module.exports = DatabaseQuerys;