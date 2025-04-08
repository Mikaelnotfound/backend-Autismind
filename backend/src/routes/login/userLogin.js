const express = require('express');
const router = express.Router();


/**
 * GET: /api/login
 * GET: /api/login/:id
 * POST: /api/login
 * PUT: /api/login/:id
 * DELETE: /api/login/:id
 * returns all users, a user by id, creates a user, updates a user, and deletes a user
 * @returns {Object} - Returns a JSON object with the user data or an error message
 * @throws {Error} - Throws an error if the user is not found or if there is an internal server error 
 */


const User = require('../../database/models/User');

router.get('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body; // Extract username, email, and password from the request body
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findByPk(req.params.id, {
            where: { username, email, password }
        }); // Fetch user by ID from the database

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const comparePassword = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
        if (comparePassword && user.email === email && user.username === username) {
            return res.status(200).json({ message: 'Login successful', user }); // Return success message and user data
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

});

module.exports = router;