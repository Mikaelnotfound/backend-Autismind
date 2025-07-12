'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class MessageQuerys extends DatabaseQuery {
    async getAllMessagesByUser(user_id) {
        const sql = 'SELECT * FROM message WHERE user_id = $1 ORDER BY shipping_date ASC';
        const values = [user_id];
        return this.executeQuery(sql, values);
    }

    async getAllMessageByChat(user_id, chat_id) {
        const sql = 'SELECT * FROM message WHERE user_id = $1 AND chat_id = $2 ORDER BY shipping_date ASC';
        const values = [user_id, chat_id];
        return this.executeQuery(sql, values);
    }

    async addMessage(shipping_date, sent_by, content, user_id, chat_id) {
        const sql = 'INSERT INTO message (shipping_date, sent_by, content, user_id, chat_id) VALUES ($1, $2, $3, $4, $5)';
        const values = [shipping_date, sent_by, content, user_id, chat_id];
        return this.executeQuery(sql, values);
    }

    async deleteMessage(message_id) {
        const sql = 'DELETE FROM message WHERE id = $1';
        const value = [message_id];
        return this.executeQuery(sql, value);
    }
}

module.exports = new MessageQuerys();