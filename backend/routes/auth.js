const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateJWT, authController.profile);

module.exports = router;
