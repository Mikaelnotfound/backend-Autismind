"use strict";

const mysql = require('mysql2/promise');

/**
 * Class for managing the database connection pool
 */
class Pool {
    /**
     * Initializes the database connection pool configuration
     * @param {string} host - Database host
     * @param {string} user - Database user
     * @param {string} password - Database password
     * @param {string} database - Database name
     */
    constructor(
        host = process.env.DB_HOST,
        user = process.env.DB_USER,
        password = process.env.DB_PASSWORD,
        database = process.env.DB_NAME
    ) {
        this.config = {
            host: host,
            user: user,
            password: password,
            database: database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
        this.pool = null; // Holds the initialized pool instance
        this.database = database; // Stores the database name
    }

    /**
     * Connects to the database and initializes the connection pool.
     * Also creates the database and tables if they do not exist.
     */
    async connect() {
        // 1. Connect without specifying the database to create it if necessary
        const { host, user, password, database } = this.config;
        const configNoDb = { host, user, password, waitForConnections: true, connectionLimit: 10, queueLimit: 0 };
        let tempConnection;
        try {
            tempConnection = await mysql.createConnection(configNoDb);
            await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
            await tempConnection.end();
        } catch (err) {
            if (tempConnection) await tempConnection.end();
            throw new Error('Erro ao criar o banco de dados: ' + err.message);
        }

        // 2. Now create the pool pointing to the correct database
        this.pool = await mysql.createPool(this.config);
        console.log('Connected to the database successfully!');
        const connection = await this.pool.getConnection();
        try {
            const sqlCommands = [
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
                `CREATE TABLE IF NOT EXISTS message (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    shipping_date DATETIME NOT NULL,
                    sent_by ENUM('user', 'bot') NOT NULL,
                    content TEXT NOT NULL,
                    user_id INT NOT NULL,
                    chat_id INT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                );`,
                `CREATE TABLE IF NOT EXISTS chat (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    date DATETIME NOT NULL,
                    title VARCHAR(191) NOT NULL,
                    user_id INT NOT NULL,
                    character_id INT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (character_id) REFERENCES \`character\`(id)
                );`,
                `CREATE TABLE IF NOT EXISTS historical (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    date DATETIME NOT NULL,
                    chat_id INT NOT NULL,
                    chat_title VARCHAR(191) NOT NULL,
                    user_id INT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (chat_id) REFERENCES chat(id)
                );`,
                `ALTER TABLE message ADD CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES chat(id);`
            ];
            for (const sql of sqlCommands) {
                try {
                    await connection.execute(sql);
                } catch (e) {
                    // Ignore already existing constraint error
                    if (!e.message.includes('Duplicate') && !e.message.includes('already exists')) throw e;
                }
            }
            console.log('Database and tables created successfully!');
        } finally {
            connection.release();
        }
    }

    /**
     * Disconnects from the database by closing the connection pool.
     */
    async disconnect() {
        if (this.pool) {
            await this.pool.end(); // Close the pool
            console.log('Database connection closed.');
        } else {
            console.log('No active database connection to close.');
        }
    }
}

module.exports = new Pool();