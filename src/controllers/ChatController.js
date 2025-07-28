
"use strict";

const chatQuerys = require('../database/querys/ChatQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const historicalQuerys = require('../database/querys/HistoricalQuerys');
const { NotFoundError, ValidationError, ForbiddenError } = require('../service/error/errorClasses');

class ChatController {
    constructor(chatQuerys, userQuerys, historicalQuerys) {
        this.chatQuerys = chatQuerys;
        this.userQuerys = userQuerys;
        this.historicalQuerys = historicalQuerys;
    }

    async getAllChats(req, res, next) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;

            const user = await this.userQuerys.getUserId(userId);
            if (!user) {
                return next(new NotFoundError('User not found'));
            }

            if (parseInt(userId) !== loggedUserId) {
                return next(new ForbiddenError('Access denied'));
            }

            const chats = await this.chatQuerys.getAllChats(userId);
            res.status(200).json({ chats });
        } catch (error) {
            next(error);
        }
    }

    async addChat(req, res, next) {
        try {
            const { user_id, character_id, title } = req.body;
            let { date } = req.body;

            if (!user_id || !character_id || !title) {
                return next(new ValidationError('user_id, and character_id are required'));
            }

            const user = await this.userQuerys.getUserId(user_id);
            if (!user) {
                return next(new NotFoundError('User not found'));
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
            next(error);
        }
    }

    async deleteChat(req, res, next) {
        try {
            const { id: chatId } = req.params;

            if (!chatId) {
                return next(new ValidationError('chatId is required'));
            }

            const result = await this.chatQuerys.deleteChat(chatId);
            if (!result.affectedRows) {
                return next(new NotFoundError('Chat not found'));
            }

            res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ChatController(chatQuerys, userQuerys, historicalQuerys);
