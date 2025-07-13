const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Rotas de Autenticação
router.post('/login', UserController.login.bind(UserController));

// Rotas CRUD de Usuário
router.get('/', UserController.getAll.bind(UserController));
router.get('/:id', UserController.getById.bind(UserController));
router.post('/', UserController.create.bind(UserController));
router.put('/:id', UserController.update.bind(UserController));
router.delete('/:id', UserController.delete.bind(UserController));

module.exports = router;