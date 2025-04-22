const readlineSync = require('readline-sync');

const Usuario = require('../class/Usuario');
const Personagem = require('../class/Personagem');
const Conversa = require('../class/Conversa');
const Historico = require('../class/Historico');

const menuAdmin = require('./menuAdmin');
const menuUsuario = require('./menuUsuario');


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

    async menuAdmin(){
        return menuAdmin();
    }

    async menuUsuario(user){
        return menuUsuario(user);
    }
}

module.exports = Menu;