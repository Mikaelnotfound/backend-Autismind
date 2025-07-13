"use-strict";

const messageQuerys = require('../database/querys/MessageQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const MessageService = require('../services/MessageService');

class MessageController {

    async getAllMessagesByUser(req, res) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;
            const user = await userQuerys.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied' });
            }
            const messages = await messageQuerys.getAllMessagesByUser(userId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async getAllMessageByChat(req, res) {
        try {
            const { chatId, userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: 'userId is required' });
            }
            const user = await userQuerys.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const messages = await messageQuerys.getAllMessageByChat(userId, chatId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async postNewMessage(req, res) {
        try {
            const { id: chatId } = req.params;
            const { user_id: userId, content, sent_by: sentBy } = req.body;
            const loggedUserId = req.user.id;

            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied: User ID in body does not match authenticated user.' });
            }

            if (!userId || !content || !sentBy) {
                return res.status(400).json({ message: 'userId, content, and sentBy are required' });
            }

            const { aiResponse, analysisResult } = await MessageService.createMessage(chatId, userId, content, sentBy);

            res.status(200).json({ 
                message: 'Message registered successfully',
                aiResponse: aiResponse,
                analysis: analysisResult
            });
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error in postNewMessage for chat ${req.params.id}:`, error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async deleteMessage(req, res) {
        try {
            const { id: messageId } = req.params;
            if (!messageId) {
                return res.status(400).json({ message: 'messageId is required' });
            }
            const message = await messageQuerys.deleteMessage(messageId);
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }
            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new MessageController();