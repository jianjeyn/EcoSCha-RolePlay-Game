const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameNarrativeController');
router.get('/', controller.getAll);
module.exports = router;
