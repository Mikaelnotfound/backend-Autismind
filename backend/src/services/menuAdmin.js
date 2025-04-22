const readlineSync = require('readline-sync');

const Personagem = require('../class/Personagem');
const Usuario = require('../class/Usuario');
// const Historico = require('../class/Historico');
const Conversa = require('../class/Conversa');

const Menu = require('../services/menu');

async function menuAdmin() {
    let continuar = true;
    while (continuar) {
        try {
            console.log("\nBem-vindo ao painel de administrador!");
            console.log("1. Cadastrar Personagem");
            console.log("2. Visualizar Usuários e Mensagens");
            console.log("3. Sair");

            const opcao = readlineSync.question("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    const nome = readlineSync.question("Nome do personagem: ");
                    const personalidade = readlineSync.question("Personalidade do personagem: ");
                    const novoPersonagem = new Personagem(null, nome, personalidade);
                    await novoPersonagem.salvarPersonagem();
                    console.log("Personagem cadastrado com sucesso!");
                    break;
                case "2":
                    const usuarios = await Usuario.obterTodosUsuarios(); // Chama o método corrigido
                    console.log("Usuários cadastrados:");
                    console.table(usuarios);

                    const userId = readlineSync.question("Digite o ID do usuário para visualizar as Conversas: ");

                    const conversas = await Conversa.obterConversasPorUsuario(userId);
                    if (conversas.length === 0) {
                        console.log("Nenhuma conversa encontrada para este usuário");
                    } else {
                        console.log("Conversas do usuário:");
                        console.table(conversas.map(c => ({
                            ID: c.id_conversa,
                            Data: c.data,
                            Título: c.titulo,
                            "ID Usuário": c.id_user,
                            "ID Personagem": c.id_personagem
                        })));
                    }
                    break;
                case "3":
                    continuar = false; // Volta para o menu principal
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } catch (error) {
            console.error("Erro no menu de administrador:", error.message);
        }
    }
    await Menu.menuPrincipal(); // Volta para o menu principal após sair do menu admin
}

module.exports = menuAdmin;