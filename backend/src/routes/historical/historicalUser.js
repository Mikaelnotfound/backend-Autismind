const express = require('express');
const router = express.Router();


/**
 * GET: /api/historical/:id
 * POST: /api/historical/:id
 * returns historical data for a user by ID, creates historical data for a user by ID
 * @returns {Object} - Returns a JSON object with the historical data or an error message
 * @throws {Error} - Throws an error if the user is not found or if there is an internal server error
 * @throws {Error} - Throws an error if the phrase is not provided or if the request is invalid
 */

const historicalController = require('../../controllers/HistoricalController');

router.get('/:id', historicalController.getHistoricalUser); // Fetch historical data for a user by ID
router.post('/:id', historicalController.postHistoricalUser); // Create historical data for a user by ID


module.exports = router;