const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameSessionController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/by-user', authenticateJWT, controller.getByUser);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
module.exports = router;
