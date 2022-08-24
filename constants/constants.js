const { NODE_ENV, JWT_SECRET } = process.env;

const regExLink = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;

const allowedCors = [
  'https://diplomamovies.nomoredomains.xyz',
  'http://diplomamovies.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

const MONGO_DB_NAME = 'mongodb://localhost:27017/moviesdb';
const JWT_IN_DEV = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 8;

const BAD_REQUEST_ERROR_MESSAGE = 'Переданы некорректные данные';
const CONFLICT_ERROR_MESSAGE = 'Данный email уже занят';
const NOT_FOUND_ERROR_MESSAGE = 'Данные по запросу не найдены';
const UNAUTHORIZED_ERROR_MESSAGE = 'Передан некорректный email или пароль';
const FORBIDDEN_ERROR_MESSAGE = 'Вы не можете удалять чужие фильмы';
const SERVER_ERROR_MESSAGE = 'Произошла ошибка на сервере';
const LINK_FORMAT_ERROR_MESSAGE = 'Некорректный формат ссылки';

module.exports = {
  regExLink,
  allowedCors,
  MONGO_DB_NAME,
  JWT_IN_DEV,
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  BAD_REQUEST_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  LINK_FORMAT_ERROR_MESSAGE,
};
