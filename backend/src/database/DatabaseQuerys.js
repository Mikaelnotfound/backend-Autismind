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
            const connection = await this.pool.pool.getConnection(); // Get a connection from the pool
            try {
                const [rows] = await connection.execute(sql, value); // Use connection.execute to execute the query
                return rows;
            } finally {
                connection.release(); // Release the connection back to the pool
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async getAllUsers() {
        const sql = 'SELECT * FROM users ORDER BY id ASC';
        return this.executeQuery(sql);
    }

    async getUserId(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const value = [id];
        return this.executeQuery(sql, value);
    }

    async getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [email];
        const result = await this.executeQuery(sql, values);
        return result[0];
    }

    async addUser(username, email, password) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const value = [username, email, password];
        return this.executeQuery(sql, value);
    }

    async verifyUser(username, email) {
        const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const value = [username, email];
        const result = this.executeQuery(sql, value);
        return result.length > 0;
    }

    async updateUser(id, username, email, password) {
        const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
        const value = [username, email, password, id];
        return this.executeQuery(sql, value);
    }

    async deleteUser(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const value = [id];
        return this.executeQuery(sql, value);
    }

    async getHistoricalData(userId) {
        const sql = 'SELECT * FROM historical WHERE user_id = ? ORDER BY id DESC';
        const value = [userId];
        return this.executeQuery(sql, value);
    }

    async addHistoricalData(userId, data) {
        const sql = 'INSERT INTO historical (user_id, data) VALUES (?, ?)';
        const value = [userId, data];
        return this.executeQuery(sql, value);
    }


    async cadastrarFrase(userId, frase) {
        const sql = 'INSERT INTO historical (user_id, data) VALUES (?, ?)';
        const values = [userId, frase];
        return await this.executeQuery(sql, values);
    }
}

module.exports = new DatabaseQuerys();