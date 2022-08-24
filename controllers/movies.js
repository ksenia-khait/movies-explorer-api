const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const {
  BAD_REQUEST_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../constants/constants');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200)
      .send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201)
      .send({movie})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
      Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
