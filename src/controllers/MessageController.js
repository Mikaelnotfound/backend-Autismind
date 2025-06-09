"use-strict";

const query = require('../database/querys/MessageQuerys');
const queryUser = require('../database/querys/UserQuerys');
const queryChat = require('../database/querys/ChatQuerys');
const queryCharacter = require('../database/querys/CharacterQuerys');
const { generateGeminiResponse, analyzeMessage } = require('../utils/geminiServices');
require('dotenv').config();

class MessageController {
    async getAllMessagesByUser(req, res) {
        try {
            const { userId } = req.params;
            const loggedUserId = req.user.id;
            const user = await queryUser.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (parseInt(userId) !== loggedUserId) {
                return res.status(403).json({ message: 'Access denied' });
            }
            const messages = await query.getAllMessagesByUser(userId);
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
            const user = await queryUser.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const messages = await query.getAllMessageByChat(userId, chatId);
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
            const chat = await queryChat.getChatById(chat_id);
            if (!chat) {
                return res.status(400).json({ message: 'chat not found' });
            }
            const user = await queryUser.getUserId(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!shipping_date) {
                shipping_date = new Date();
                shipping_date = shipping_date.toISOString().slice(0, 19).replace('T', ' ');
            }
            await query.addMessage(
                shipping_date ?? null,
                sent_by ?? null,
                content ?? null,
                user_id ?? null,
                chat_id ?? null
            );
            let aiResponse = null;
            let analysisResult = null;
            if (sent_by === 'user') {
                const character = await queryCharacter.getCharacterById(chat.character_id);
                const characterPersona = character ? character.personality : "Você é um assistente útil e amigável.";
                const rawHistory = await query.getAllMessageByChat(user_id, chat_id);
                aiResponse = await generateGeminiResponse(content, rawHistory, characterPersona);
                analysisResult = analyzeMessage(content);
                const aiMessageTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                await query.addMessage(
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
            const message = await query.deleteMessage(messageId);
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