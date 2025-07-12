const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const userLoginController = require('../controllers/UserLoginController');
const ChatController = require('../controllers/ChatController');
const HistoricalController = require('../controllers/HistoricalController');
const MessageController = require('../controllers/MessageController');
const Auth = require('../utils/Auth');

router.post('/login', userLoginController.postUserLogin.bind(userLoginController));

router.get('/', UserRegisterController.getAllUsers.bind(UserRegisterController));
router.get('/:id', UserRegisterController.getUserId.bind(UserRegisterController));
router.post('/', UserRegisterController.postNewUser.bind(UserRegisterController));
router.put('/:id', UserRegisterController.updateUser.bind(UserRegisterController));
router.delete('/:id', UserRegisterController.deleteUser.bind(UserRegisterController));

router.get('/:userId/chats', Auth.middlewareVerifyToken.bind(Auth), ChatController.getAllChats.bind(ChatController));
router.get('/:userId/historical', Auth.middlewareVerifyToken.bind(Auth), HistoricalController.getHistoricalUser.bind(HistoricalController));
router.get('/:userId/messages', Auth.middlewareVerifyToken.bind(Auth), MessageController.getAllMessagesByUser.bind(MessageController));

module.exports = router;
