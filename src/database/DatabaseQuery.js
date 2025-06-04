const pool = require('./Pool/Pool');

/**
 * Class for executing database queries
 */
class DatabaseQuerys {
    constructor() {
        this.pool = pool; // Reference to the database connection pool
    }

    /**
     * Executes a SQL query with optional parameters
     * @param {string} sql - The SQL query to execute
     * @param {Array} value - The parameters for the query
     * @returns {Promise<Array>} - The result of the query
     */
    async executeQuery(sql, value = []) {
        if (!this.pool.pool) {
            throw new Error('Database connection pool is not initialized');
        }

        try {
            const connection = await this.pool.pool.getConnection(); // Get a connection from the pool
            try {
                const [rows] = await connection.execute(sql, value); // Execute the query
                return rows;
            } finally {
                connection.release(); // Release the connection back to the pool
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

// module.exports = new DatabaseQuerys();
module.exports = DatabaseQuerys;