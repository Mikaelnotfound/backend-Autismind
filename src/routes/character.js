const express = require('express');
const router = express.Router();

const CharacterController = require('../controllers/CharacterController');
const Auth = require('../utils/Auth');

router.get('/characters', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getAllCharacters.bind(CharacterController));
router.get('/characters/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getCharacterById.bind(CharacterController));
router.post('/characters', Auth.middlewareVerifyToken.bind(Auth), CharacterController.addCharacter.bind(CharacterController));
router.delete('/characters/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.deleteCharacter.bind(CharacterController));

module.exports = router;