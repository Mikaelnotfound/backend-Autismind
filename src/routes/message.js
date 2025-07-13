const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');
const Auth = require('../utils/Auth');

router.get('/users/:userId/messages/', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessagesByUser.bind(MessageController));
router.get('/chat/:chatId/messages/:userId', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessageByChat.bind(MessageController));
router.post('/messages/chat/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.postNewMessage.bind(MessageController));
router.delete('/messages/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.deleteMessage.bind(MessageController));

module.exports = router;