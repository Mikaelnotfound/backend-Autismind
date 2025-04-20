const DatabaseQuery = require('../DatabaseQuery');

class UserUqerys extends DatabaseQuery {
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
}

module.exports = new UserUqerys()