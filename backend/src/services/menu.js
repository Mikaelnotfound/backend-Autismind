const readlineSync = require('readline-sync');

const Usuario = require('../class/Usuario');
const Personagem = require('../class/Personagem');
const Conversa = require('../class/Conversa');
const Historico = require('../class/Historico');

class Menu {
    async menuPrincipal() {
        let continuar = true;
        while (continuar) {
            try {
                console.log("Bem-vindo ao AutisMind!");
                console.log("1. Login");
                console.log("2. Registrar");
                console.log("3. Sair");

                const opcao = readlineSync.question("Escolha uma opção: ");

                switch (opcao) {
                    case "1":
                        await this.login();
                        break;
                    case "2":
                        await this.registrar();
                        break;
                    case "3":
                        console.log("Saindo...");
                        continuar = false; // Define a flag para sair do loop
                        break;
                    default:
                        console.log("Opção inválida.");
                }
            } catch (error) {
                console.error("Erro no menu principal:", error.message);
                // Decida se você quer continuar mostrando o menu após um erro grave
                // Por enquanto, vamos continuar
            }
        }
    }

    async login() {
        try {
            const email = readlineSync.question("Digite seu email: ");
            const senha = readlineSync.question("Digite sua senha: ");

            const user = await Usuario.obterUsuarioPorEmail(email);
            if (user && user.senha === senha) {
                console.log(`Bem-vindo, ${user.username}!`);
                if (user.email === process.env.EMAIL_ADM || user.email === 'admin123@proton.me') {
                    await this.menuAdmin(user);
                } else {
                    await this.menuUsuario(user);
                }
            } else {
                console.log("Credenciais inválidas.");
            }
        } catch (error) {
            console.error("Erro no login:", error.message);
        }
    }

    async registrar() {
        try {
            const username = readlineSync.question("Digite seu nome de usuário: ");
            const email = readlineSync.question("Digite seu email: ");
            const senha = readlineSync.question("Digite sua senha: ");

            const novoUsuario = new Usuario(null, username, senha, email);
            await novoUsuario.salvarUsuario();
            console.log("Usuário registrado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.message);
        }
    }

    async menuAdmin(user) {
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
    
                        const userId = readlineSync.question("Digite o ID do usuário para visualizar as mensagens: ");
                        const historico = new Historico(userId);
                        const mensagens = await historico.obterHistorico();
                        console.log("Mensagens do usuário:");
                        console.table(mensagens);
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
        await this.menuPrincipal(); // Volta para o menu principal após sair do menu admin
    }

    async menuUsuario(user) {
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
        await this.menuPrincipal(); // Volta para o menu principal após sair do menu de usuário
    }
}

module.exports = Menu;