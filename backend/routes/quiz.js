const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/topics', quizController.getTopics);
router.get('/questions/:topicId', quizController.getQuestions);
router.post('/submit', quizController.submitAnswer);

module.exports = router;
