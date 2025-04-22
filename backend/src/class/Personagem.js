const CharacterQuerys = require('../database/querys/CharacterQuerys');

class Personagem {
    constructor(id, nome, personalidade) {
        this.id = id;
        this.nome = nome;
        this.personalidade = personalidade;
    }

    /**
     * Interage com o usuário com base na mensagem enviada
     * @param {string} mensagem
     * @returns {string}
     */
    interagir(mensagem) {
        const msg = mensagem.toLowerCase();

        if (msg.includes("ansioso") || msg.includes("ansiedade")) {
            return `${this.nome}: Sinto muito por saber disso. Quer conversar sobre o que está te deixando assim?`;
        } else if (msg.includes("feliz") || msg.includes("alegre")) {
            return `${this.nome}: Que bom saber disso! Fico feliz por você. Quer me contar o que deixou seu dia melhor?`;
        } else if (msg.includes("triste") || msg.includes("chateado")) {
            return `${this.nome}: Poxa... às vezes tudo parece difícil mesmo. Mas estou aqui pra ouvir você.`;
        } else if (msg.includes("nervoso") || msg.includes("raiva")) {
            return `${this.nome}: Entendo... respirar fundo ajuda. Quer me contar o que aconteceu?`;
        } else {
            return `${this.nome}: Entendi. Me conta mais sobre isso, quero te ouvir.`;
        }
    }

    /**
     * Salva o personagem no banco de dados
     * @returns {Promise<void>}
     */
    async salvarPersonagem() {
        try {
            await CharacterQuerys.addCharacter({ name: this.nome, personality: this.personalidade });
            console.log('Personagem salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar personagem:', error.message);
        }
    }

    /**
     * Obtém todos os personagens do banco de dados
     * @returns {Promise<Array>}
     */
    static async obterTodosPersonagens() {
        try {
            const personagens = await CharacterQuerys.getAllCharacter();
            return personagens.map(
                (p) => new Personagem(p.id, p.name, p.personality)
            );
        } catch (error) {
            console.error('Erro ao obter personagens:', error.message);
            return [];
        }
    }
}

module.exports = Personagem;