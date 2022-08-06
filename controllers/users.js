const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 8;

module.exports.register = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201)
      .send({
        email: user.email,
        name: user.name,
      }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Данный email уже занят'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200)
        .send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new UnauthorizedError('Передан некорректный email или пароль'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
