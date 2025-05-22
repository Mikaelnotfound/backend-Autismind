const express = require('express');
const router = express.Router();

const UserRegisterController = require('./controllers/UserRegisterController');
const userLoginController = require('./controllers/UserLoginController');
const historicalController = require('./controllers/HistoricalController');
const MessageController = require('./controllers/MessageController');
const ChatController = require('./controllers/ChatController');
const CharacterController = require('./controllers/CharacterController'); // Import CharacterController

// Register routes
router.get('/users', UserRegisterController.getAllUsers); // Fetch all users
router.get('/users/:id', UserRegisterController.getUserId); // Fetch user by ID
router.post('/users', UserRegisterController.postNewUser); // Create a new user
router.put('/users/:id', UserRegisterController.updateUser); // Update user by ID
router.delete('/users/:id', UserRegisterController.deleteUser); // Delete user by ID

// Login routes
router.get('/login/', userLoginController.getUserLogin); // Fetch user by ID

// Historical routes
router.get('/users/:userId/historical/', historicalController.getHistoricalUser); // Fetch historical data for a user by ID

// Message routes
router.get('/users/:userId/messages/', MessageController.getAllMessagesByUser); // Fetch all messages by user
router.get('/chat/:chatId/messages/', MessageController.getAllMessageByChat); // Fetch all messages by chat
router.post('/messages/chat/:id', MessageController.postNewMessage); // Create a new message
router.delete('/messages/:id', MessageController.deleteMessage); // Delete a message by ID

// Chat routes
router.get('/users/chats/:userId', ChatController.getAllChats); // Fetch all chats for a user
router.post('/chats', ChatController.addChat); // Create a new chat
router.delete('/chats/:id', ChatController.deleteChat); // Delete a chat by ID

// Character routes
router.get('/characters', CharacterController.getAllCharacters); // Fetch all characters
router.get('/characters/:id', CharacterController.getCharacterById); // Fetch a character by ID
router.post('/characters', CharacterController.addCharacter); // Create a new character
router.delete('/characters/:id', CharacterController.deleteCharacter); // Delete a character by ID

module.exports = router;