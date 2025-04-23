const readlineSync = require('readline-sync');

const Conversa = require('../class/Conversa');
const Personagem = require('../class/Personagem');

const Menu = require('../services/menu');

async function menuUsuario(user) {
    let continuar = true;
    let conversas = null;
    while (continuar) {
        try {
            console.log("\nBem-vindo ao menu do usuário!");
            console.log("1. Criar Conversa");
            console.log("2. Enviar Mensagem");
            console.log("3. Sair");

            const opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    const titulo = readlineSync.question("Digite o título da conversa: ");
                    const personagens = await Personagem.obterTodosPersonagens();
                    console.log("Escolha um personagem para conversar:");
                    console.table(personagens);

                    const personagemId = readlineSync.question("Digite o ID do personagem: ");
                    const personagem = personagens.find(p => p.id === parseInt(personagemId));
                    if (!personagem) {
                        console.log("Personagem inválido.");
                        break;
                    }

                    conversas = await Conversa.obterConversasPorUsuario(user.id); // Chama o método estático
                    const novaConversa = new Conversa(conversas.id, null, titulo, user.id, personagem.id);
                    await novaConversa.salvarConversa(); // Salva a conversa no banco de dados
                    await novaConversa.salvarNoHistorico(); // Salva a conversa no histórico
                    console.log(`Conversa "${titulo}" criada com ${personagem.nome}.`);
                    break;
                case "2":
                    // Exibe as conversas do usuário
                    conversas = await Conversa.obterConversasPorUsuario(user.id); // Chama o método estático
                    if (conversas.length === 0) {
                        console.log("Nenhuma conversa encontrada. Crie uma conversa antes de enviar mensagens.");
                        break;
                    }

                    console.log("Conversas disponíveis:");
                    console.table(conversas.map(c => ({
                        ID: c.id_conversa,
                        Título: c.titulo,
                        Data: c.data,
                        "ID Personagem": c.id_personagem
                    })));

                    // Solicita o ID da conversa
                    const conversaId = readlineSync.question("Digite o ID da conversa para enviar a mensagem: ");
                    const conversaSelecionada = conversas.find(c => c.id_conversa === parseInt(conversaId));
                    if (!conversaSelecionada) {
                        console.log("Conversa inválida.");
                        break;
                    }

                    // Solicita a mensagem
                    const mensagem = readlineSync.question("Digite sua mensagem: ");

                    // Salva a mensagem na conversa
                    const conversa = new Conversa(
                        conversaSelecionada.id_conversa,
                        conversaSelecionada.data,
                        conversaSelecionada.titulo,
                        user.id,
                        conversaSelecionada.id_personagem
                    );
                    await conversa.salvarMensagem('user', mensagem); // Salva a mensagem como enviada pelo usuário
                    console.log("Mensagem enviada com sucesso!");
                    break;
                case "3":
                    continuar = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } catch (error) {
            console.error("Erro no menu do usuário:", error.message);
        }
    }
    await Menu.menuPrincipal(); // Volta para o menu principal após sair do menu de usuário
}

module.exports = menuUsuario;