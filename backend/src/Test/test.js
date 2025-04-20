const { faker } = require('@faker-js/faker');
const Pool = require('../database/Pool/Pool'); // Ajuste o caminho para sua classe Pool
const bcrypt = require('bcrypt');
const DatabaseOperations = require('../database/DatabaseQuerys'); // Sua classe de operações de banco


async function populateFakeUsers(pool, numUsers = 10) {
    const connection = await pool.getConnection();
    try {
        for (let i = 0; i < numUsers; i++) {
            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password({ length: 10, memorable: true }); // Senha mais "memorável" para testes
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            const values = [username, email, hashedPassword];
            await connection.execute(sql, values);
            console.log(`Usuário fake ${username} inserido.`);
        }
        console.log(`${numUsers} usuários fakes inseridos com sucesso.`);
    } catch (error) {
        console.error('Erro ao inserir usuários fakes:', error);
    } finally {
        connection.release();
    }
}

async function main1() {
    try {
        await Pool.connect();
        await populateFakeUsers(Pool.pool, 400); // Insere 50 usuários fakes
    } catch (error) {
        console.error('Erro no processo principal:', error);
    } finally {
        await Pool.disconnect();
    }
}



async function gerarFraseFake() {
    const numPalavras = faker.number.int({ min: 3, max: 15 }); // Frases com 3 a 15 palavras
    return faker.lorem.sentence(numPalavras);
}

async function popularFrasesFakesPorUsuario(pool, dbOps, usuarioId, numFrases = 5) {
    for (let i = 0; i < numFrases; i++) {
        const textoFake = await gerarFraseFake();
        await dbOps.cadastrarFrase(usuarioId, textoFake);
        console.log(`Frase fake cadastrada para o usuário ${usuarioId}: ${textoFake}`);
    }
    console.log(`${numFrases} frases fakes cadastradas para o usuário ${usuarioId}.`);
}

async function main() {
    try {
        await Pool.connect(); // Inicializa o pool de conexões
        const dbOps = DatabaseOperations;

        // Obtenha alguns IDs de usuários existentes no seu banco de dados
        const usuarios = await dbOps.getAllUsers();

        if (usuarios && usuarios.length > 0) {
            for (const usuario of usuarios) {
                await popularFrasesFakesPorUsuario(Pool.pool, dbOps, usuario.id, 47); // Cadastra 3 frases para cada usuário
            }
        } else {
            console.log('Não há usuários cadastrados para associar as frases fakes.');
        }

        await populateFakeUsers(Pool.pool, 400); // Insere 400 usuários fakes
    } catch (error) {
        console.error('Erro na aplicação:', error);
    } finally {
        await Pool.disconnect(); // Encerra o pool de conexões
    }
}

//main1();
main()
