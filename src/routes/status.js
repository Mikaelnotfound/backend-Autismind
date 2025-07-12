const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({ message: "API status: OK" });
});

module.exports = router;