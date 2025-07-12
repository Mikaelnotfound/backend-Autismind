const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');
const Auth = require('../utils/Auth');

router.get('/chat/:chatId/messages/:userId', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessageByChat.bind(MessageController));
router.post('/chat/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.postNewMessage.bind(MessageController));
router.delete('/:id', Auth.middlewareVerifyToken.bind(Auth), MessageController.deleteMessage.bind(MessageController));

module.exports = router;
