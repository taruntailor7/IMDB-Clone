const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateToken } = require('../auth/auth');

router.get('/', authenticateToken, movieController.getAllMovies);
router.post('/', authenticateToken, movieController.createMovie);
router.get('/:id', authenticateToken, movieController.getMovie);
router.put('/:id', authenticateToken, movieController.updateMovie);
router.delete('/:id', authenticateToken, movieController.deleteMovie);

module.exports = router;
