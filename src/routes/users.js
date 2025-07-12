const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const userLoginController = require('../controllers/UserLoginController');

router.post('/login/', userLoginController.postUserLogin.bind(userLoginController));

router.get('/users', UserRegisterController.getAllUsers.bind(UserRegisterController));
router.get('/users/:id', UserRegisterController.getUserId.bind(UserRegisterController));
router.post('/users', UserRegisterController.postNewUser.bind(UserRegisterController));
router.put('/users/:id', UserRegisterController.updateUser.bind(UserRegisterController));
router.delete('/users/:id', UserRegisterController.deleteUser.bind(UserRegisterController));


router.get('/status', (req, res) => {
  res.status(200).json({ message: "Users route is running" });
});

module.exports = router;
