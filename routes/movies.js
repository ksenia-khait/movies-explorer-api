const router = require('express').Router();

const {
  getSavedMovies,
  createMovie,
  removeMovie
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateMovieId,
} =require('../middlewares/celebrateValidation');

router.get('/movies', getSavedMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:_id', validateMovieId, removeMovie);

module.exports = router;
