const mysql = require('mysql2/promise');


class Pool {
    constructor(
        host = process.env.DB_HOST || 'localhost',
        user = process.env.DB_USER || 'root',
        password = process.env.DB_PASSWORD || '',
        database = process.env.DB_NAME || 'db_autismind'
    ) {

        this.config = {
            host: host,
            user: user,
            password: password,
            database: database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        }
        this.pool = null;
        this.database = database;
    }

    async connect() {
        const sqlCommands = [
            `CREATE DATABASE IF NOT EXISTS ${this.database};`,
            `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(191) NOT NULL,
                email VARCHAR(191) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );`,
            `CREATE TABLE IF NOT EXISTS historical (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                data VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );`
        ];

        try {
            this.pool = await mysql.createPool(this.config);
            console.log('Connected to the database successfully!');

            const connection = await this.pool.getConnection(); // Obtenha uma conexão do pool

            try {
                for (const sql of sqlCommands) {
                    await connection.execute(sql); // Use connection.execute para executar as queries
                }
                console.log('Database and tables created successfully!');
            } finally {
                connection.release(); // Libere a conexão de volta ao pool
            }

        } catch (error) {
            console.error('Error connecting or creating database/tables:', error);
            if (this.pool) {
                await this.pool.end(); // Encerre o pool em caso de erro grave
            }
            throw error;
        }
    }

    async disconnect() {
        if (this.pool) {
            await this.pool.end();
            console.log('Database connection closed.');
        } else {
            console.log('No active database connection to close.');
        }
    }
}

module.exports = new Pool();