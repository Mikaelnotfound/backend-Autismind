'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class ChatQuerys extends DatabaseQuery {
    async getAllChats(user_id) {
        const sql = 'SELECT * FROM chat WHERE user_id = $1 ORDER BY "date" DESC';
        const values = [user_id];
        return this.executeQuery(sql, values);
    }

    async addChat(date, title, user_id, character_id) {
        const sql = `INSERT INTO chat (date, title, user_id, character_id) VALUES ($1, $2, $3, $4) RETURNING id`;
        const values = [date, title, user_id, character_id];
        const result = await this.executeQuery(sql, values);
        return result[0].id;
    }

    async deleteChat(chat_id) {
        const sql = 'DELETE FROM chat WHERE id = $1';
        const values = [chat_id];
        return this.executeQuery(sql, values);
    }

    async getChatById(chat_id) {
        const sql = 'SELECT * FROM chat WHERE id = $1';
        const values = [chat_id];
        const result = await this.executeQuery(sql, values);
        return result && result.length > 0 ? result[0] : null;
    }
}

module.exports = new ChatQuerys();