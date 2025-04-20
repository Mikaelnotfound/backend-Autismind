const query = require('../database/querys/ChatQuerys');
const queryUser = require('../database/querys/UserQuerys');

class ChatController {
    /**
     * Retrieves all chats for a specific user
     */
    async getAllChats(req, res) {
        try {
            const { userId } = req.params;

            const user = await queryUser.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
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
            const { date, user_id, character_id } = req.body;

            if (!date || !user_id || !character_id) {
                return res.status(400).json({ message: 'date, user_id, and character_id are required' });
            }

            const user = await queryUser.getUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await query.addChat(date, user_id, character_id);
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