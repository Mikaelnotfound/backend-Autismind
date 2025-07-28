
"use strict";

const characterQuerys = require('../database/querys/CharacterQuerys');
const { NotFoundError, ValidationError } = require('../service/error/errorClasses');

class CharacterController {
    constructor(characterQuerys) {
        this.characterQuerys = characterQuerys;
    }
    async getAllCharacters(req, res, next) {
        try {
            const characters = await this.characterQuerys.getAllCharacter();
            if (!characters || characters.length === 0) {
                return next(new NotFoundError('No characters found'));
            }
            res.status(200).json({ characters });
        } catch (error) {
            next(error);
        }
    }

    async getCharacterById(req, res, next) {
        try {
            const { id: characterId } = req.params;

            if (!characterId) {
                return next(new ValidationError('characterId is required'));
            }

            const character = await this.characterQuerys.getCharacterById(characterId);
            if (!character) {
                return next(new NotFoundError('Character not found'));
            }

            res.status(200).json({ character });
        } catch (error) {
            next(error);
        }
    }

    async addCharacter(req, res, next) {
        try {
            const { name, personality } = req.body;

            if (!name || !personality) {
                return next(new ValidationError('name and personality are required'));
            }

            await this.characterQuerys.addCharacter({ name, personality });
            res.status(201).json({ message: 'Character created successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteCharacter(req, res, next) {
        try {
            const { id: characterId } = req.params;

            if (!characterId) {
                return next(new ValidationError('characterId is required'));
            }

            const result = await this.characterQuerys.deleteCharacter(characterId);
            if (!result.affectedRows) {
                return next(new NotFoundError('Character not found'));
            }

            res.status(200).json({ message: 'Character deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CharacterController(characterQuerys);
