const express = require('express');
const router = express.Router();

const RegisterController = require('./controllers/registerController');
const userLoginController = require('./controllers/UserLoginController');
const historicalController = require('./controllers/HistoricalController');
const MessageController = require('./controllers/MessageController');
const ChatController = require('./controllers/ChatController');
const CharacterController = require('./controllers/CharacterController'); // Import CharacterController

// Register routes
router.get('/api/register', RegisterController.getAllUsers); // Fetch all users
router.get('/api/register/:id', RegisterController.getUserId); // Fetch user by ID
router.post('/api/register', RegisterController.postNewUser); // Create a new user
router.put('/api/register/:id', RegisterController.updateUser); // Update user by ID
router.delete('/api/register/:id', RegisterController.deleteUser); // Delete user by ID

// Login routes
router.get('/api/login/', userLoginController.getUserLogin); // Fetch user by ID

// Historical routes
router.get('/api/historical/:id', historicalController.getHistoricalUser); // Fetch historical data for a user by ID
router.post('/api/historical/:id', historicalController.postHistoricalUser); // Create historical data for a user by ID

// Message routes
router.get('/api/messages/user/:userId', MessageController.getAllMessagesByUser); // Fetch all messages by user
router.get('/api/messages/chat/:chatId', MessageController.getAllMessageByChat); // Fetch all messages by chat
router.post('/api/messages/chat/:id', MessageController.postNewMessage); // Create a new message
router.delete('/api/messages/:id', MessageController.deleteMessage); // Delete a message by ID

// Chat routes
router.get('/api/chats/user/:userId', ChatController.getAllChats); // Fetch all chats for a user
router.post('/api/chats', ChatController.addChat); // Create a new chat
router.delete('/api/chats/:id', ChatController.deleteChat); // Delete a chat by ID

// Character routes
router.get('/api/characters', CharacterController.getAllCharacters); // Fetch all characters
router.get('/api/characters/:id', CharacterController.getCharacterById); // Fetch a character by ID
router.post('/api/characters', CharacterController.addCharacter); // Create a new character
router.delete('/api/characters/:id', CharacterController.deleteCharacter); // Delete a character by ID

module.exports = router;