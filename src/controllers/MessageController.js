"use-strict";

const messageQuerys = require('../database/querys/MessageQuerys');
const userQuerys = require('../database/querys/UserQuerys');
const chatQuerys = require('../database/querys/ChatQuerys');
const characterQuerys = require('../database/querys/CharacterQuerys');
const { generateGeminiResponse, analyzeMessage } = require('../utils/geminiServices');
require('dotenv').config();

class MessageController {
    constructor(messageQuerys, userQuerys, chatQuerys, characterQuerys, generateGeminiResponse, analyzeMessage) {
        this.messageQuerys = messageQuerys;
        this.userQuerys = userQuerys;
        this.chatQuerys = chatQuerys;
        this.characterQuerys = characterQuerys;
        this.generateGeminiResponse = generateGeminiResponse;
        this.analyzeMessage = analyzeMessage;
    }

    async getAllMessagesByUser(req, res) {
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
            const messages = await this.messageQuerys.getAllMessagesByUser(userId);
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
            const user = await this.userQuerys.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const messages = await this.messageQuerys.getAllMessageByChat(userId, chatId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async postNewMessage(req, res) {
        try {
            const { id: chat_id } = req.params;
            const { user_id, content, sent_by } = req.body;
            let { shipping_date } = req.body;
            const loggedUserId = req.user.id;
            if (parseInt(user_id) !== loggedUserId) {
                 return res.status(403).json({ message: 'Access denied: User ID in body does not match authenticated user.' });
            }
            if (!user_id || !content || !sent_by) {
                return res.status(400).json({ message: 'user_id, content and sent_by are required' });
            }
            const chat = await this.chatQuerys.getChatById(chat_id);
            if (!chat) {
                return res.status(400).json({ message: 'chat not found' });
            }
            const user = await this.userQuerys.getUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!shipping_date) {
                shipping_date = new Date();
                shipping_date = shipping_date.toISOString().slice(0, 19).replace('T', ' ');
            }
            await this.messageQuerys.addMessage(
                shipping_date ?? null,
                sent_by ?? null,
                content ?? null,
                user_id ?? null,
                chat_id ?? null
            );
            let aiResponse = null;
            let analysisResult = null;
            if (sent_by === 'user') {
                const character = await this.characterQuerys.getCharacterById(chat.character_id);
                const characterPersona = character ? character.personality : "Você é um assistente útil e amigável.";
                const rawHistory = await this.messageQuerys.getAllMessageByChat(user_id, chat_id);
                aiResponse = await this.generateGeminiResponse(content, rawHistory, characterPersona);
                analysisResult = this.analyzeMessage(content);
                const aiMessageTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                await this.messageQuerys.addMessage(
                    aiMessageTimestamp,
                    'bot',
                    aiResponse ?? null,
                    user_id ?? null,
                    chat_id ?? null
                );
            }
            res.status(200).json({ 
                message: 'message registered successfully',
                aiResponse: aiResponse,
                analysis: analysisResult
            });
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Erro em postNewMessage para chat ${req.params.id}:`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            let errorMessage = 'Erro interno do servidor ao processar mensagem ou IA.';
            if (error.response && error.response.data && error.response.data.error) {
                 errorMessage += ` Detalhes: ${error.response.data.error.message}`;
            } else if (error.message) {
                 errorMessage += ` Detalhes: ${error.message}`;
            }
            res.status(500).json({ message: errorMessage, error: error.message || error });
        }
    }

    async deleteMessage(req, res) {
        try {
            const { id: messageId } = req.params;
            if (!messageId) {
                return res.status(400).json({ message: 'messageId is required' });
            }
            const message = await this.messageQuerys.deleteMessage(messageId);
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

module.exports = new MessageController(messageQuerys, userQuerys, chatQuerys, characterQuerys, generateGeminiResponse, analyzeMessage);