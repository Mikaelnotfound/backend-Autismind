const ChatQuerys = require('../database/querys/ChatQuerys');
const MessageQuerys = require('../database/querys/MessageQuerys');
const HistoricalQuerys = require('../database/querys/HistoricalQuerys');

class Conversa {
    constructor(id_conversa, data, titulo, id_user, id_personagem) {
        this.id_conversa = id_conversa;
        this.data = data || new Date().toUTCString().slice(0, 19).replace('T', ' ');
        this.titulo = titulo;
        this.id_user = id_user;
        this.id_personagem = id_personagem;
    }

    /**
     * Salva a conversa no banco de dados
     * @returns {Promise<void>}
     */
    async salvarMensagem(sent_by, content) {
        try {
            const shipping_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await MessageQuerys.addMessage(shipping_date, sent_by, content, this.id_user, this.id_conversa);
            console.log('Mensagem salva com sucesso na conversa!');
        } catch (error) {
            console.error('Erro ao salvar mensagem na conversa:', error.message || error);
        }
    }

    async salvarConversa() {
        try {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formata a data
            const idConversa = await ChatQuerys.addChat(date, this.titulo, this.id_user, this.id_personagem);
            this.id_conversa = idConversa; // Define o ID da conversa
            console.log('Conversa salva com sucesso! ID:', this.id_conversa);
        } catch (error) {
            console.error('Erro ao salvar conversa:', error.message || error);
        }
    }

    async salvarNoHistorico() {
        try {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            await HistoricalQuerys.addHistorical(date, this.id_conversa, this.titulo, this.id_user);
            console.log('Conversa salva no histórico com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar conversa no histórico:', error.message || error);
        }
    }

    /**
     * Obtém todas as conversas de um usuário
     * @param {number} userId
     * @returns {Promise<Array>}
     */
    static async obterConversasPorUsuario(userId) {
        try {
            const conversas = await ChatQuerys.getAllChats(userId);
            return conversas.map(
                (c) => new Conversa(c.id, c.date, c.title, c.user_id, c.character_id)
            );
        } catch (error) {
            console.error('Erro ao obter conversas:', error.message || error);
            return [];
        }
    }

    async obterMensagensConversa(userId, chatId) {
        try {
            const conversa = await MessageQuerys.getAllMessageByChat(userId, chatId);
            return conversa.forEach(message => {
                if (message.sent_by === "user") { console.log(`${message.date}:(${message.sent_by})`) }
                if (message.sent_by === "bot") { console.log(`${message.date}:(${message.sent_by})`) }
            });
        } catch (error) {
            console.error('Erro ao obter as mensagens da conversa: ', error.message || error);
        }
    }
}

module.exports = Conversa;