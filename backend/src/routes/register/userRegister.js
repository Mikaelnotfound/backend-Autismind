const express = require('express');
const router = express.Router();

/**
 * GET: /api/register
 * GET: /api/register/:id
 * POST: /api/register
 * PUT: /api/register/:id
 * DELETE: /api/register/:id
 * returns all users, a user by id, creates a user, updates a user, and deletes a user
 * @returns {Object} - Returns a JSON object with the user data or an error message
 * @throws {Error} - Throws an error if the user is not found or if there is an internal server error
 */

const RegisterController = require('../../controllers/registerController');

router.get('/', RegisterController.getAllUsers); // Fetch all users
router.get('/:id', RegisterController.getUserId); // Fetch user by ID
router.post('/', RegisterController.postNewUser); // Create a new user
router.put('/:id', RegisterController.updateUser); // Update user by ID
router.delete('/:id', RegisterController.deleteUser); // Delete user by ID

module.exports = router;