const HistoricalQuerys = require('../database/querys/HistoricalQuerys');

class Historico {
    constructor(id_user, id_conversa, titulo, personagem, data) {
        this.id_user = id_user;
        this.id_conversa = id_conversa;
        this.titulo = titulo;
        this.personagem = personagem;
        this.data = data || new Date().toUTCString();
        this.conversas = [];
    }

    /**
     * Adiciona uma conversa ao histórico local
     * @param {string} conversa - A mensagem ou conversa a ser adicionada
     */
    adicionarConversa(conversa) {
        this.conversas.push({
            conversa,
            data: new Date().toUTCString(),
        });
    }

    /**
     * Salva o histórico no banco de dados
     * @returns {Promise<void>}
     */
    async salvarConversa() {
        try {
            await HistoricalQuerys.addHistoricalData(this.id_user, this.data);
            console.log(`Conversa "${this.titulo}" foi salva no histórico.`);
        } catch (error) {
            console.error('Erro ao salvar conversa no histórico:', error.message);
        }
    }

    /**
     * Obtém o histórico de conversas de um usuário do banco de dados
     * @returns {Promise<Array>} - Lista de conversas do histórico
     */
    async obterHistorico() {
        try {
            const historico = await HistoricalQuerys.getHistoricalData(this.id_user);
            console.log('Histórico recuperado com sucesso.');
            return historico;
        } catch (error) {
            console.error('Erro ao obter histórico do banco de dados:', error.message);
            return [];
        }
    }
}

module.exports = Historico;