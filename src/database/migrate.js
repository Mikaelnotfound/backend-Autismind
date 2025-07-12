'use-strict';

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

const DDL_COMMANDS = [
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        communication_level INT NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS "character" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        personality VARCHAR(191) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS chat (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP WITH TIME ZONE NOT NULL,
        title VARCHAR(191) NOT NULL,
        user_id INT NOT NULL,
        character_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (character_id) REFERENCES "character"(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS message (
        id SERIAL PRIMARY KEY,
        shipping_date TIMESTAMP WITH TIME ZONE NOT NULL,
        sent_by VARCHAR(10) NOT NULL CHECK (sent_by IN ('user', 'bot')),
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        chat_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS historical (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP WITH TIME ZONE NOT NULL,
        chat_id INT NOT NULL,
        chat_title VARCHAR(191) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE
    );`
];

async function migrate() {
    if (!DATABASE_URL) {
        console.error('DATABASE_URL environment variable is not set.');
        process.exit(1);
    }

    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL database for migration.');

        for (const command of DDL_COMMANDS) {
            await client.query(command);
        }
        console.log('All tables created or already exist in PostgreSQL.');

    } catch (error) {
        console.error('Failed to migrate database:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.end(); 
            console.log('Database connection closed.');
        }
    }
}

module.exports = migrate;