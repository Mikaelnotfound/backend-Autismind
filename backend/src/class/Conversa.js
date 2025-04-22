const ChatQuerys = require('../database/querys/ChatQuerys');

class Conversa {
    constructor(id_conversa, detecta_emocao, data, mensagem, id_user, id_personagem) {
        this.id_conversa = id_conversa;
        this.detecta_emocao = detecta_emocao;
        this.data = data || new Date().toUTCString();
        this.mensagem = mensagem;
        this.id_user = id_user;
        this.id_personagem = id_personagem;
    }

    /**
     * Salva a conversa no banco de dados
     * @returns {Promise<void>}
     */
    async salvarConversa() {
        try {
            await ChatQuerys.addChat(this.data, this.id_user, this.id_personagem);
            console.log('Conversa salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar conversa:', error.message);
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
                (c) => new Conversa(c.id, null, c.date, null, c.user_id, c.character_id)
            );
        } catch (error) {
            console.error('Erro ao obter conversas:', error.message);
            return [];
        }
    }
}

module.exports = Conversa;