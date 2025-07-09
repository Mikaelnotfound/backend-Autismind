const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');
const Auth = require('../utils/auth');

router.get('/users/chats/:userId', Auth.middlewareVerifyToken.bind(Auth), ChatController.getAllChats.bind(ChatController));
router.post('/chats', Auth.middlewareVerifyToken.bind(Auth), ChatController.addChat.bind(ChatController));
router.delete('/chats/:id', Auth.middlewareVerifyToken.bind(Auth), ChatController.deleteChat.bind(ChatController));

module.exports = router;