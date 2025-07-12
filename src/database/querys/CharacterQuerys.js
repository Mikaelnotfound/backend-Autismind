'use strict';

const DatabaseQuery = require('../DatabaseQuery');

class CharacterQuerys extends DatabaseQuery {
    async getAllCharacter() {
        const sql = 'SELECT * FROM "character"';
        return this.executeQuery(sql);
    }

    async getCharacterById(character_id) {
        const sql = 'SELECT * FROM "character" WHERE id = $1';
        const values = [character_id];
        return this.executeQuery(sql, values);
    }

    async addCharacter(data) {
        const sql = 'INSERT INTO "character" (name, personality) VALUES ($1, $2)';
        const values = [data.name, data.personality];
        return this.executeQuery(sql, values);
    }

    async addManyCharacters(characters) {
        const queries = characters.map(character => {
            return {
                sql: 'INSERT INTO "character" (name, personality) VALUES ($1, $2)',
                values: [character.name, character.personality]
            };
        });
        return this.executeTransaction(queries);
    }

    async deleteCharacter(character_id) {
        const sql = 'DELETE FROM "character" WHERE id = $1';
        const values = [character_id];
        return this.executeQuery(sql, values);
    }
}

module.exports = new CharacterQuerys();