const express = require('express');
const router = express.Router();
const controller = require('../controllers/achievementController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/by-user', authenticateJWT, controller.getByUser);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
module.exports = router;
