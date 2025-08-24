const express = require('express');
const router = express.Router();
const controller = require('../controllers/characterController');
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/role/:roleType', controller.getByRoleType);
module.exports = router;
