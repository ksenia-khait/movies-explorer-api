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

module.exports = {
  regExLink,
  allowedCors,
  MONGO_DB_NAME,
  JWT_IN_DEV,
};
