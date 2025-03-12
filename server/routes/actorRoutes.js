const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');
const { authenticateToken } = require('../auth/auth');

router.get('/', authenticateToken, actorController.getAllActors);
router.post('/', authenticateToken, actorController.createActor);
router.get('/:id', authenticateToken, actorController.getActor);
router.put('/:id', authenticateToken, actorController.updateActor);
router.delete('/:id', authenticateToken, actorController.deleteActor);

module.exports = router;
