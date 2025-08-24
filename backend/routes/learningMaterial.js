const express = require('express');
const router = express.Router();
const controller = require('../controllers/learningMaterialController');
router.get('/', controller.getAll);
router.get('/latest', controller.getLatest);
module.exports = router;
