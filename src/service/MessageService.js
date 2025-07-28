"use strict";

const messageQuerys = require('../database/querys/MessageQuerys');
const chatQuerys = require('../database/querys/ChatQuerys');
const characterQuerys = require('../database/querys/CharacterQuerys');
const { generateGeminiResponse, analyzeMessage } = require('../utils/geminiServices');

class MessageService {
    static async createMessage(chatId, userId, content, sentBy) {
        const chat = await chatQuerys.getChatById(chatId);
        if (!chat) {
            throw new Error('Chat not found');
        }

        const shipping_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await messageQuerys.addMessage(shipping_date, sentBy, content, userId, chatId);

        let aiResponse = null;
        let analysisResult = null;

        if (sentBy === 'user') {
            const character = await characterQuerys.getCharacterById(chat.character_id);
            const characterPersona = character ? character.personality : "Você é um assistente útil e amigável.";
            const rawHistory = await messageQuerys.getAllMessageByChat(userId, chatId);

            aiResponse = await generateGeminiResponse(content, rawHistory, characterPersona);
            analysisResult = analyzeMessage(content);

            const aiMessageTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await messageQuerys.addMessage(aiMessageTimestamp, 'bot', aiResponse, userId, chatId);
        }

        return { aiResponse, analysisResult };
    }
}

module.exports = MessageService;