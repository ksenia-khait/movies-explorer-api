const regExLink = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;

const allowedCors = [
  'https://diplomamovies.nomoredomains.xyz',
  'http://diplomamovies.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = {
  regExLink,
  allowedCors,
};
