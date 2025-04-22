const UserQuerys = require('../database/querys/UserQuerys');

class Usuario {
    constructor(id, username, senha, email, idade, nivel_comunicacao, isAdmin = false) {
        this.id = id;
        this.username = username;
        this.senha = senha;
        this.email = email;
        this.idade = idade;
        this.nivel_comunicacao = nivel_comunicacao;
        this.isAdmin = isAdmin;
    }

    static async obterTodosUsuarios() {
        try {
            const usersData = await UserQuerys.getAllUsers();
            return usersData;
        } catch (error) {
            console.error('Erro ao obter todos os usuários:', error.message || error);
            throw error;
        }
    }

    /**
     * Obtém um usuário pelo email
     * @param {string} email - O email do usuário
     * @returns {Promise<Usuario|null>} - Retorna uma instância de Usuario ou null se não encontrado
     */
    static async obterUsuarioPorEmail(email) {
        try {
            const userData = await UserQuerys.getUserByEmail(email); // Método da classe UserQuerys
            if (userData) {
                return new Usuario(
                    userData.id,
                    userData.username,
                    userData.password,
                    userData.email,
                    userData.age,
                    userData.communication_level,
                    userData.isAdmin
                );
            }
            return null; // Retorna null se o usuário não for encontrado
        } catch (error) {
            console.error('Erro ao obter usuário por email:', error.message || error);
            throw error;
        }
    }

    /**
     * Salva o usuário no banco de dados
     * @returns {Promise<void>}
     */
    async salvarUsuario() {
        try {
            await UserQuerys.addUser(this.username, this.email, this.senha);
            console.log('Usuário salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar usuário:', error.message);
            throw error;
        }
    }
}

module.exports = Usuario;