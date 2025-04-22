const readlineSync = require('readline-sync');

const Conversa = require('../class/Conversa');
const Personagem = require('../class/Personagem');

const Menu = require('../services/menu');

async function menuUsuario(user) {
    let continuar = true;
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

                    const novaConversa = new Conversa(null, null, null, null, user.id, personagem.id);
                    await novaConversa.salvarConversa();
                    console.log(`Conversa "${titulo}" criada com ${personagem.nome}.`);
                    break;
                case "2":
                    const mensagem = readlineSync.question("Digite sua mensagem: ");
                    const personagemParaMensagem = readlineSync.question("Digite o ID do personagem para enviar a mensagem: ");
                    const conversa = new Conversa(null, null, new Date().toUTCString(), mensagem, user.id, personagemParaMensagem);
                    await conversa.salvarConversa();
                    console.log("Mensagem enviada com sucesso!");
                    break;
                case "3":
                    continuar = false; // Volta para o menu principal
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