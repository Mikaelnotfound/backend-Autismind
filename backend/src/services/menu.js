const readlineSync = require('readline-sync');
const bcrypt = require('bcrypt');
const verifyEmail = require('../utils/verify')
const Usuario = require('../class/Usuario');

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
                        continuar = false;
                        break;
                    default:
                        console.log("Opção inválida.");
                }
            } catch (error) {
                console.error("Erro no menu principal:", error.message);
            }
        }
    }

    async login() {
        try {
            let email = readlineSync.question("Digite seu email: ");
            while(!verifyEmail(email)){
                email = readlineSync.question("Digite um email válido: ");
            }

            let senha = readlineSync.question("Digite sua senha: ");
            if(senha.trim() === ''){
                senha = readlineSync.question("Digite uma senha válida: ");
            }

            const user = await Usuario.obterUsuarioPorEmail(email);
            if (user && await bcrypt.compare(senha, user.senha)) {
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
            let username = readlineSync.question("Digite seu nome de usuário: ");
            while(username.trim() === ''){
                username = readlineSync.question("Digite um nome de usuário válido: ");
            }

            let email = readlineSync.question("Digite seu email: ");
            while(!verifyEmail(email)){
                email = readlineSync.question("Digite um email válido: ");
            }
            
            let senha = readlineSync.question("Digite sua senha: ");
            if(senha.trim() === ''){
                senha = readlineSync.question("Digite uma senha válida: ");
            }
            const senhaHashed = await bcrypt.hash(senha, 10);
            senha = senhaHashed;
            
            let nivel_comunicacao = readlineSync.question("Digite seu nível de comunicação")
            while(!nivel_comunicacao.trim() === ''){
                username = readlineSync.question("Digite seu nome de usuário: ");
            }

            const novoUsuario = new Usuario(null, username, senha, email, nivel_comunicacao);
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