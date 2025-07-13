const express = require('express');
const router = express.Router();

const historicalController = require('../controllers/HistoricalController');
const Auth = require('../utils/Auth');

router.get('/users/:userId/historical/', Auth.middlewareVerifyToken.bind(Auth), historicalController.getHistoricalUser.bind(historicalController));

module.exports = router;