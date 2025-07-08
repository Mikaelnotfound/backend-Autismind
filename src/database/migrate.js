'use-strict';

const mysql = require('mysql2/promise');
const dbConfig = require('../env.js');

const DDL_COMMANDS = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        communication_level INT NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS \`character\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        personality VARCHAR(191) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS chat (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATETIME NOT NULL,
        title VARCHAR(191) NOT NULL,
        user_id INT NOT NULL,
        character_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (character_id) REFERENCES \`character\`(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS message (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shipping_date DATETIME NOT NULL,
        sent_by ENUM('user', 'bot') NOT NULL,
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        chat_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS historical (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATETIME NOT NULL,
        chat_id INT NOT NULL,
        chat_title VARCHAR(191) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE
    );`
];

async function migrate() {
    const { host, user, password, database } = dbConfig;
    let connection;

    try {
        connection = await mysql.createConnection({ host, user, password });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
        console.log(`Database '${database}' is ready.`);

        await connection.changeUser({ database });

        for (const command of DDL_COMMANDS) {
            await connection.execute(command);
        }
        console.log('All tables created or already exist.');

    } catch (error) {
        console.error('Failed to migrate database:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = migrate;