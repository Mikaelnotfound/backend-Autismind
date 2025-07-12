'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class UserQuerys extends DatabaseQuery {
    async getAllUsers() {
        const sql = 'SELECT * FROM users ORDER BY id ASC';
        return this.executeQuery(sql);
    }

    async getUserId(id) {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const value = [id];
        const result = await this.executeQuery(sql, value);
        return result[0];
    }

    async getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await this.executeQuery(sql, values);
        return result[0];
    }

    async addUser(username, email, password, communication_level) {
        const sql = 'INSERT INTO users (username, email, password, communication_level) VALUES ($1, $2, $3, $4) RETURNING id';
        const value = [username, email, password, communication_level];
        const result = await this.executeQuery(sql, value);
        return result[0].id;
    }

    async verifyUser(username, email) {
        const sql = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const value = [username, email];
        const result = await this.executeQuery(sql, value);
        return result.length > 0;
    }

    async updateUser(id, username, email, password) {
        const sql = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4';
        const value = [username, email, password, id];
        return this.executeQuery(sql, value);
    }

    async deleteUser(id) {
        const sql = 'DELETE FROM users WHERE id = $1';
        const value = [id];
        return this.executeQuery(sql, value);
    }
}

module.exports = new UserQuerys();
