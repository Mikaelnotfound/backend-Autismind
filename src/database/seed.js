'use strict';

const fs = require('fs').promises;
const path = require('path');

const CharacterQuerys = require('./querys/CharacterQuerys');

async function seedCharacters() {
    try {
        console.log('Checking if characters table needs seeding...');

        const existingCharacters = await CharacterQuerys.executeQuery('SELECT COUNT(*) FROM "character"');
        const count = parseInt(existingCharacters[0].count, 10);

        if (count === 0) {
            console.log('Characters table is empty. Seeding initial characters...');

            const seedDataPath = path.join(__dirname, 'data', 'character-seed.json');
            const seedData = await fs.readFile(seedDataPath, 'utf-8');
            const charactersToSeed = JSON.parse(seedData);

            await CharacterQuerys.addManyCharacters(charactersToSeed);
            
            console.log('Initial characters seeded successfully.');
        } else {
            console.log(`Characters table already contains ${count} entries. Skipping seeding.`);
        }
    } catch (error) {
        console.error('Failed to seed characters:', error);
    }
}

module.exports = seedCharacters;
