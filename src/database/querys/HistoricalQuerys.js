'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class HistoricalQuerys extends DatabaseQuery {
    async getHistoricalByUserId(userId) {
        const sql = 'SELECT * FROM historical WHERE user_id = $1 ORDER BY "date" DESC';
        const value = [userId];
        return this.executeQuery(sql, value);
    }

    async addHistoricalData(date, chatId, chatTitle, userId) {
        const sql = 'INSERT INTO historical (date, chat_id, chat_title, user_id) VALUES ($1, $2, $3, $4)';
        const value = [date, chatId, chatTitle, userId];
        return this.executeQuery(sql, value);
    }

    async addHistorical(date, chat_id, chat_title, user_id) {
        const sql = `
            INSERT INTO historical (date, chat_id, chat_title, user_id)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [date, chat_id, chat_title, user_id];
        await this.executeQuery(sql, values);
    }
}

module.exports = new HistoricalQuerys();