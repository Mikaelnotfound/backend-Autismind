const express = require('express');
const router = express.Router();

const CharacterController = require('../controllers/CharacterController');
const Auth = require('../utils/auth');

router.get('/', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getAllCharacters.bind(CharacterController));
router.get('/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.getCharacterById.bind(CharacterController));
router.post('/', Auth.middlewareVerifyToken.bind(Auth), CharacterController.addCharacter.bind(CharacterController));
router.delete('/:id', Auth.middlewareVerifyToken.bind(Auth), CharacterController.deleteCharacter.bind(CharacterController));

module.exports = router;