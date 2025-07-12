const express = require('express');
const router = express.Router();

const UserRegisterController = require('/var/task/src/controllers/UserRegisterController');
const userLoginController = require('/var/task/src/controllers/UserLoginController');
const ChatController = require('/var/task/src/controllers/ChatController');
const HistoricalController = require('/var/task/src/controllers/HistoricalController');
const MessageController = require('/var/task/src/controllers/MessageController');
const Auth = require('/var/task/src/utils/auth');

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
