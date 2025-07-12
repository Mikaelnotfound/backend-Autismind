const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');
const Auth = require('../utils/auth');

router.post('/', Auth.middlewareVerifyToken.bind(Auth), ChatController.addChat.bind(ChatController));
router.delete('/:id', Auth.middlewareVerifyToken.bind(Auth), ChatController.deleteChat.bind(ChatController));

module.exports = router;
