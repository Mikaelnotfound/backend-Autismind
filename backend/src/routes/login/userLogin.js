const express = require('express');
const router = express.Router();


/**
 * GET: /api/login/:id
 * returns all users, a user by id, creates a user, updates a user, and deletes a user
 * @returns {Object} - Returns a JSON object with the user data or an error message
 * @throws {Error} - Throws an error if the user is not found or if there is an internal server error 
 */

const userLoginController = require('../../controllers/UserLoginController');

router.get('/:id', userLoginController.getUserLogin); // Fetch user by ID

module.exports = router;