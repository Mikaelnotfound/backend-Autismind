const DatabaseQuery = require('../DatabaseQuery');

class HistoricalQuerys extends DatabaseQuery {
    /**
     * Retrieves historical data for a user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} - List of historical data
     */
    async getHistoricalData(userId) {
        const sql = 'SELECT * FROM historical WHERE date = ? ORDER BY id DESC';
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

    async addHistorical(date, chat_id, chat_title, user_id) {
        const sql = `INSERT INTO historical (date, chat_id, chat_title, user_id) VALUES (?, ?, ?, ?)`;
        const values = [date, chat_id, chat_title, user_id];
        await this.executeQuery(sql, values);
    }
}

module.exports = new HistoricalQuerys();