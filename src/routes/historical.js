const express = require('express');
const router = express.Router();

const historicalController = require('../controllers/HistoricalController');
const Auth = require('../utils/auth');

router.get('/users/:userId/historical/', Auth.middlewareVerifyToken.bind(Auth), historicalController.getHistoricalUser);

module.exports = router;