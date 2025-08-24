const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/create-room', gameController.createRoom);
router.post('/join-room', gameController.joinRoom);
router.get('/session/:roomCode', gameController.getSession);
router.post('/start', gameController.startGame);

module.exports = router;
