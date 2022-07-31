const {
  celebrate,
  Joi,
} = require('celebrate');

module.exports.validateRegister = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

module.exports.validateGetUser = celebrate({
  body: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
    }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .required(),
      trailerLink: Joi.string()
        .required(),
      thumbnail: Joi.string()
        .required(),
      owner: Joi.string()
        .required(),
      movieId: Joi.string()
        .required(),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
    }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
})
