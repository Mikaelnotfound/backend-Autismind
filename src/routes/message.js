const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');
const Auth = require('../utils/auth');

router.get('/users/:userId/messages/', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessagesByUser);
router.get('/chat/:chatId/messages/:userId', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessageByChat);
router.post('/messages/chat/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.postNewMessage);
router.delete('/messages/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.deleteMessage);

module.exports = router;