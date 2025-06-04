const DatabaseQuery = require('../DatabaseQuery');

class HistoricalQuerys extends DatabaseQuery {
    /**
     * Retrieves historical data for a user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} - List of historical data
     */
    async getHistoricalByUserId(userId) {
        const sql = 'SELECT * FROM historical WHERE user_id = ? ORDER BY date DESC';
        const value = [userId];
        return this.executeQuery(sql, value);
    }

    /**
     * Adds historical data for a user
     * @param {number} userId - The ID of the user
     * @param {string} data - The historical data to add
     * @returns {Promise<void>}
     */
    async addHistoricalData(date, chatId, chatTitle, userId) {
        const sql = 'INSERT INTO historical (date, chat_id, chat_title, user_id) VALUES (?, ?, ?, ?)';
        const value = [date, chatId, chatTitle, userId];
        return this.executeQuery(sql, value);
    }

    /**
     * Adds a new entry to the historical table
     * @param {string} date - The date of the historical entry
     * @param {number} chat_id - The ID of the chat
     * @param {string} chat_title - The title of the chat
     * @param {number} user_id - The ID of the user
     * @returns {Promise<void>}
     */
    async addHistorical(date, chat_id, chat_title, user_id) {
        const sql = `
            INSERT INTO historical (date, chat_id, chat_title, user_id)
            VALUES (?, ?, ?, ?)
        `;
        const values = [date, chat_id, chat_title, user_id];
        await this.executeQuery(sql, values);
    }
}

module.exports = new HistoricalQuerys();