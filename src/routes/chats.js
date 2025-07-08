const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');
const Auth = require('../utils/auth');

router.get('/users/chats/:userId', Auth.middlewareVerifyToken.bind(Auth), ChatController.getAllChats);
router.post('/chats', Auth.middlewareVerifyToken.bind(Auth), ChatController.addChat);
router.delete('/chats/:id', Auth.middlewareVerifyToken.bind(Auth), ChatController.deleteChat);

module.exports = router;