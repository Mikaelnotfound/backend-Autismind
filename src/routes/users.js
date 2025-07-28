const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/login/', UserController.postUserLogin.bind(UserController));

router.get('/users', UserController.getAllUsers.bind(UserController));
router.get('/users/:id', UserController.getUserId.bind(UserController));
router.post('/users', UserController.postNewUser.bind(UserController));
router.put('/users/:id', UserController.updateUser.bind(UserController));
router.delete('/users/:id', UserController.deleteUser.bind(UserController));

module.exports = router;
