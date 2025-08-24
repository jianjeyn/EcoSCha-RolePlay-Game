const express = require('express');
const router = express.Router();
const controller = require('../controllers/quizTopicController');
router.get('/', controller.getAll);
router.get('/:id/questions', controller.getQuestions);
module.exports = router;
