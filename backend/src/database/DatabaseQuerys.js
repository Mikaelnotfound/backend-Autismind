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

    /**
     * Retrieves all users from the database
     * @returns {Promise<Array>} - List of all users
     */
    async getAllUsers() {
        const sql = 'SELECT * FROM users ORDER BY id ASC';
        return this.executeQuery(sql);
    }

    /**
     * Retrieves a user by their ID
     * @param {number} id - The ID of the user
     * @returns {Promise<Object>} - The user data
     */
    async getUserId(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const value = [id];
        return this.executeQuery(sql, value);
    }

    /**
     * Retrieves a user by their email
     * @param {string} email - The email of the user
     * @returns {Promise<Object>} - The user data
     */
    async getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [email];
        const result = await this.executeQuery(sql, values);
        return result[0];
    }

    /**
     * Adds a new user to the database
     * @param {string} username - The username of the user
     * @param {string} email - The email of the user
     * @param {string} password - The hashed password of the user
     * @returns {Promise<void>}
     */
    async addUser(username, email, password) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const value = [username, email, password];
        return this.executeQuery(sql, value);
    }

    /**
     * Verifies if a user exists by username or email
     * @param {string} username - The username to check
     * @param {string} email - The email to check
     * @returns {Promise<boolean>} - True if the user exists, false otherwise
     */
    async verifyUser(username, email) {
        const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const value = [username, email];
        const result = await this.executeQuery(sql, value);
        return result.length > 0;
    }

    /**
     * Updates a user's information
     * @param {number} id - The ID of the user
     * @param {string} username - The new username
     * @param {string} email - The new email
     * @param {string} password - The new hashed password
     * @returns {Promise<void>}
     */
    async updateUser(id, username, email, password) {
        const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
        const value = [username, email, password, id];
        return this.executeQuery(sql, value);
    }

    /**
     * Deletes a user by their ID
     * @param {number} id - The ID of the user
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const value = [id];
        return this.executeQuery(sql, value);
    }

    /**
     * Retrieves historical data for a user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} - List of historical data
     */
    async getHistoricalData(userId) {
        const sql = 'SELECT * FROM historical WHERE user_id = ? ORDER BY id ASC';
        const value = [userId];
        return this.executeQuery(sql, value);
    }

    /**
     * Adds historical data for a user
     * @param {number} userId - The ID of the user
     * @param {string} data - The historical data to add
     * @returns {Promise<void>}
     */
    async addHistoricalData(userId, data) {
        const sql = 'INSERT INTO historical (user_id, data) VALUES (?, ?)';
        const value = [userId, data];
        return this.executeQuery(sql, value);
    }
}

module.exports = new DatabaseQuerys();