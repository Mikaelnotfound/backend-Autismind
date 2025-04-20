const DatabaseQuery = require('../DatabaseQuery');

class MessageQuerys extends DatabaseQuery {
    /**
     * Retrieves all messages by a specific user
     * @param {number} user_id - The ID of the user
     * @returns {Promise<Array>} - List of messages
     */
    async getAllMessagesByUser(user_id) {
        const sql = 'SELECT * FROM message WHERE user_id = ? ORDER BY shipping_date ASC';
        const values = [user_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Retrieves all messages from a specific chat for a user
     * @param {number} user_id - The ID of the user
     * @param {number} chat_id - The ID of the chat
     * @returns {Promise<Array>} - List of messages
     */
    async getAllMessageByChat(user_id, chat_id) {
        const sql = 'SELECT * FROM message WHERE user_id = ? AND chat_id = ? ORDER BY shipping_date ASC';
        const values = [user_id, chat_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Adds a new message to the database
     * @param {string} shipping_date - The date the message was sent
     * @param {number} user_id - The ID of the user
     * @param {number} chat_id - The ID of the chat
     * @param {string} content - The content of the message
     * @param {string} sent_by - Who sent the message ('user' or 'bot')
     * @returns {Promise<void>}
     */
    async addMessage(shipping_date, user_id, chat_id, content, sent_by) {
        const sql = 'INSERT INTO message (shipping_date, sent_by, content, user_id, chat_id) VALUES (?, ?, ?, ?, ?)';
        const values = [shipping_date, sent_by, content, user_id, chat_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Deletes a message by its ID
     * @param {number} message_id - The ID of the message
     * @returns {Promise<void>}
     */
    async deleteMessage(message_id) {
        const sql = 'DELETE FROM message WHERE id = ?';
        const value = [message_id];
        return this.executeQuery(sql, value);
    }
}

module.exports = new MessageQuerys();