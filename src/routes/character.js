const express = require('express');
const router = express.Router();

const CharacterController = require('../controllers/CharacterController');
const Auth = require('../utils/auth');

router.get('/characters', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getAllCharacters);
router.get('/characters/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getCharacterById);
router.post('/characters', Auth.middlewareVerifyToken.bind(Auth), CharacterController.addCharacter);
router.delete('/characters/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.deleteCharacter);

module.exports = router;