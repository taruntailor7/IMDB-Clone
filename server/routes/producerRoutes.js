const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');
const { authenticateToken } = require('../auth/auth');

router.get('/', authenticateToken, producerController.getAllProducers);
router.post('/', authenticateToken, producerController.createProducer);
router.get('/:id', authenticateToken, producerController.getProducer);
router.put('/:id', authenticateToken, producerController.updateProducer);
router.delete('/:id', authenticateToken, producerController.deleteProducer);

module.exports = router;
