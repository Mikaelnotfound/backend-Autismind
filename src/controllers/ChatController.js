"use strict";

const chatQuerys = require('../database/querys/ChatQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const historicalQuerys = require('../database/querys/HistoricalQuerys');

class ChatController {
    constructor(chatQuerys, userQuerys, historicalQuerys) {
        this.chatQuerys = chatQuerys;
        this.userQuerys = userQuerys;
        this.historicalQuerys = historicalQuerys;
    }

    async getAllChats(req, res) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;

            const user = await this.userQuerys.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied' });
            }

            const chats = await this.chatQuerys.getAllChats(userId);
            res.status(200).json({ chats });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async addChat(req, res) {
        try {
            const { user_id, character_id, title } = req.body;
            let { date } = req.body;

            if (!user_id || !character_id || !title) {
                return res.status(400).json({ message: 'user_id, and character_id are required' });
            }

            const user = await this.userQuerys.getUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!date) {
                date = new Date();
                date = date.toISOString().slice(0, 19).replace('T', ' ');
            }

            const newChatId = await this.chatQuerys.addChat(date, title, user_id, character_id);
            await this.historicalQuerys.addHistoricalData(date, newChatId, title, user_id);
            
            const newChat = {
                id: newChatId,
                date,
                title,
                user_id,
                character_id
            };

            res.status(201).json({ message: 'Chat created successfully', chat: newChat });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async deleteChat(req, res) {
        try {
            const { id: chatId } = req.params;

            if (!chatId) {
                return res.status(400).json({ message: 'chatId is required' });
            }

            const result = await this.chatQuerys.deleteChat(chatId);
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

module.exports = new ChatController(chatQuerys, userQuerys, historicalQuerys);