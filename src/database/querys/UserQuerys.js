'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class UserUqerys extends DatabaseQuery {
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

    async addUser(username, email, password, communication_level) {
        const sql = 'INSERT INTO users (username, email, password, communication_level) VALUES (?, ?, ?, ?)';
        const value = [username, email, password, communication_level];
        return this.executeQuery(sql, value);
    }

    async verifyUser(username, email) {
        const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const value = [username, email];
        const result = await this.executeQuery(sql, value);
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
}

module.exports = new UserUqerys()