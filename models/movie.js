const mongoose = require('mongoose');
const { regExLink } = require('constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
},
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => regExLink.test(v),
      message: 'Неверно указан формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => regExLink.test(v),
      message: 'Неверно указан формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => regExLink.test(v),
      message: 'Неверно указан формат ссылки',
    },
  },
  owner: {
    require: true,
  },
  movieId: {
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('movie', movieSchema);
