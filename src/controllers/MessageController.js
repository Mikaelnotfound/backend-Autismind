
"use-strict";

const messageQuerys = require('../database/querys/MessageQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const MessageService = require('../service/MessageService');
const { NotFoundError, ValidationError, ForbiddenError } = require('../service/error/errorClasses');

class MessageController {
    constructor() {
        this.messageQuerys = messageQuerys;
        this.userQuerys = userQuerys;
    }

    async getAllMessagesByUser(req, res, next) {
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
            const messages = await this.messageQuerys.getAllMessagesByUser(userId);
            res.status(200).json({ messages });
        } catch (error) {
            next(error);
        }
    }

    async getAllMessageByChat(req, res, next) {
        try {
            const { chatId, userId } = req.params;
            if (!userId) {
                return next(new ValidationError('userId is required'));
            }
            const user = await this.userQuerys.getUserId(userId);
            if (!user) {
                return next(new NotFoundError('User not found'));
            }
            const messages = await this.messageQuerys.getAllMessageByChat(userId, chatId);
            res.status(200).json({ messages });
        } catch (error) {
            next(error);
        }
    }

    async postNewMessage(req, res, next) {
        try {
            const { id: chatId } = req.params;
            const { user_id: userId, content, sent_by: sentBy } = req.body;
            const loggedUserId = req.user.id;
            if (parseInt(userId) !== loggedUserId) {
                 return next(new ForbiddenError('Access denied: User ID in body does not match authenticated user.'));
            }
            if (!userId || !content || !sentBy) {
                return next(new ValidationError('user_id, content and sent_by are required'));
            }

	    const { aiResponse, analysisResult } = await MessageService.createMessage(chatId, userId, content, sentBy);
            
            res.status(200).json({ 
                message: 'message registered successfully',
                aiResponse: aiResponse,
                analysis: analysisResult
            });
        } catch (error) {
	    next(error);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const { id: messageId } = req.params;
            if (!messageId) {
                return next(new ValidationError('messageId is required'));
            }
            const message = await this.messageQuerys.deleteMessage(messageId);
            if (!message) {
                return next(new NotFoundError('Message not found'));
            }
            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MessageController();
