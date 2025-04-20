const DatabaseQuery = require('../DatabaseQuery');

class CharacterQuerys extends DatabaseQuery {
    /**
     * Retrieves all characters from the database
     * @returns {Promise<Array>} - List of all characters
     */
    async getAllCharacter() {
        const sql = 'SELECT * FROM `character`';
        return this.executeQuery(sql);
    }

    /**
     * Retrieves a character by its ID
     * @param {number} character_id - The ID of the character
     * @returns {Promise<Object>} - The character data
     */
    async getCharacterById(character_id) {
        const sql = 'SELECT * FROM `character` WHERE id = ?';
        const values = [character_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Adds a new character to the database
     * @param {Object} data - The character data
     * @param {string} data.name - The name of the character
     * @param {string} data.personality - The personality of the character
     * @returns {Promise<void>}
     */
    async addCharacter(data) {
        const sql = 'INSERT INTO `character` (name, personality) VALUES (?, ?)';
        const values = [data.name, data.personality];
        return this.executeQuery(sql, values);
    }

    /**
     * Deletes a character by its ID
     * @param {number} character_id - The ID of the character
     * @returns {Promise<void>}
     */
    async deleteCharacter(character_id) {
        const sql = 'DELETE FROM `character` WHERE id = ?';
        const values = [character_id];
        return this.executeQuery(sql, values);
    }
}

module.exports = new CharacterQuerys();