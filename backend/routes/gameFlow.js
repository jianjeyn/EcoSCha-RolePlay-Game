
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const gameController = require('../controllers/gameController');

// Quiz endpoints
router.post('/quiz/privilege', authenticateJWT, gameController.getQuizPrivilege);

// Lobby & Room
router.post('/create-room', authenticateJWT, gameController.createRoom);
router.get('/rooms', authenticateJWT, gameController.listRooms);
router.post('/join-room', authenticateJWT, gameController.joinRoom);
router.post('/leave-room', authenticateJWT, gameController.leaveRoom);

// Game Session
router.post('/start', authenticateJWT, gameController.startGame);
router.post('/next-phase', authenticateJWT, gameController.nextPhase);
router.post('/night-action', authenticateJWT, gameController.nightAction);
router.post('/vote', authenticateJWT, gameController.votePlayer);

// Leaderboard & Achievements
router.get('/leaderboard', authenticateJWT, gameController.getLeaderboard);
router.get('/achievements/:userId', authenticateJWT, gameController.getUserAchievements);

module.exports = router;

// Quiz endpoints
router.post('/quiz/start', authenticateJWT, gameController.startQuiz);
router.post('/quiz/submit', authenticateJWT, gameController.submitQuizAnswer);
router.post('/quiz/score', authenticateJWT, gameController.scoreQuiz);
