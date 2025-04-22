class Feedback {
    constructor(id_feedback, feedback, contexto, id_conversa) {
        this.id_feedback = id_feedback;
        this.feedback = feedback;
        this.contexto = contexto;
        this.id_conversa = id_conversa;
    }

    darFeedback(contexto, id_conversa, personagem) {
        const emocao = personagem.detectarEmocao(contexto);
        const conselho = personagem.mapaEmocional[emocao] || personagem.mapaEmocional.neutro;

        this.feedback = `Baseado na conversa que tivemos, aqui vai um conselho do ${personagem.nome} para te orientar nessa jornada: ${conselho}`;
        this.contexto = contexto;
        this.id_conversa = id_conversa;

        return this.feedback;
    }
}

module.exports = Feedback;