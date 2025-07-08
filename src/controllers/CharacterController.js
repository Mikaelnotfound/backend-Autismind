"use strict";

const characterQuerys = require('../database/querys/CharacterQuerys');

class CharacterController {
    constructor(characterQuerys) {
        this.characterQuerys = characterQuerys;
    }
    async getAllCharacters(req, res) {
        try {
            const characters = await this.characterQuerys.getAllCharacter();
            res.status(200).json({ characters });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async getCharacterById(req, res) {
        try {
            const { id: characterId } = req.params;

            if (!characterId) {
                return res.status(400).json({ message: 'characterId is required' });
            }

            const character = await this.characterQuerys.getCharacterById(characterId);
            if (!character) {
                return res.status(404).json({ message: 'Character not found' });
            }

            res.status(200).json({ character });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async addCharacter(req, res) {
        try {
            const { name, personality } = req.body;

            if (!name || !personality) {
                return res.status(400).json({ message: 'name and personality are required' });
            }

            await this.characterQuerys.addCharacter({ name, personality });
            res.status(201).json({ message: 'Character created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async deleteCharacter(req, res) {
        try {
            const { id: characterId } = req.params;

            if (!characterId) {
                return res.status(400).json({ message: 'characterId is required' });
            }

            const result = await this.characterQuerys.deleteCharacter(characterId);
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'Character not found' });
            }

            res.status(200).json({ message: 'Character deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new CharacterController(characterQuerys);