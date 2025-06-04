const query = require('../database/querys/ChatQuerys');
const queryUser = require('../database/querys/UserQuerys');
const queryHistorical = require('../database/querys/HistoricalQuerys');

class ChatController {
    /**
     * Retrieves all chats for a specific user
     */
    async getAllChats(req, res) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id; // Vem do token JWT

            const user = await queryUser.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied' });
            }

            const chats = await query.getAllChats(userId);
            res.status(200).json({ chats });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    /**
     * Adds a new chat to the database
     */
    async addChat(req, res) {
        try {
            const { user_id, character_id, title } = req.body;
            let { date } = req.body;

            if (!user_id || !character_id || !title) {
                return res.status(400).json({ message: 'user_id, and character_id are required' });
            }

            const user = await queryUser.getUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!date) {
                date = new Date();
                date = date.toISOString().slice(0, 19).replace('T', ' ');
            }

            const chat = await query.addChat(date, title, user_id, character_id);
            await queryHistorical.addHistoricalData(date, chat, title, user_id);
            res.status(201).json({ message: 'Chat created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    /**
     * Deletes a chat by its ID
     */
    async deleteChat(req, res) {
        try {
            const { id: chatId } = req.params;

            if (!chatId) {
                return res.status(400).json({ message: 'chatId is required' });
            }

            const result = await query.deleteChat(chatId);
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new ChatController();