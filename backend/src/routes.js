const express = require('express');
const router = express.Router();

const RegisterController = require('./controllers/registerController');
const userLoginController = require('./controllers/UserLoginController');
const historicalController = require('./controllers/HistoricalController');



router.get('/api/register', RegisterController.getAllUsers); // Fetch all users
router.get('/api/register/:id', RegisterController.getUserId); // Fetch user by ID
router.post('/api/register', RegisterController.postNewUser); // Create a new user
router.put('/api/register/:id', RegisterController.updateUser); // Update user by ID
router.delete('/api/register/:id', RegisterController.deleteUser); // Delete user by ID

router.get('/api/login/:id', userLoginController.getUserLogin); // Fetch user by ID

router.get('/api/historical/:id', historicalController.getHistoricalUser); // Fetch historical data for a user by ID
router.post('/api/historical/:id', historicalController.postHistoricalUser); // Create historical data for a user by ID

module.exports = router;