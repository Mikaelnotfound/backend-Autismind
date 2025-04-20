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
    async addHistoricalData(userId, date) {
        const sql = 'INSERT INTO historical (user_id, date) VALUES (?, ?)';
        const value = [userId, date];
        return this.executeQuery(sql, value);
    }
}

module.exports = new HistoricalQuerys();