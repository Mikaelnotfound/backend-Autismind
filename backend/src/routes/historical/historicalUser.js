const express = require('express');
const router = express.Router();


/**
 * GET: /api/historical/:id
 * POST: /api/historical/:id
 * returns historical data for a user by ID, creates historical data for a user by ID
 * @returns {Object} - Returns a JSON object with the historical data or an error message
 * @throws {Error} - Throws an error if the user is not found or if there is an internal server error
 * @throws {Error} - Throws an error if the phrase is not provided or if the request is invalid
 */


const Historical = require('../../database/models/Historical');
const User = require('../../database/models/User');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id); // Fetch user by ID from the database
        // Check if user exists in the database
        const historical = await Historical.findAll({
            where: { userId: id }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ Historical: historical });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { phrase } = req.body; // Extract phrase from the request body
        // Check if phrase is provided
        const user = await User.findByPk(id);
        const historical = await Historical.findAll({
            where: { userId: id }
        });

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!phrase) {
            return res.status(404).json({ message: 'sentence can not be null' });
        }
        await historical.create({ phrase: phrase }); // Create historical data for the user in the database
        // Check if historical data is created successfully
        res.status(200).json({ message: 'Historical data updated successfully', Historical: historical });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});


module.exports = router;