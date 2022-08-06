const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: () => 'Неверно указан адрес почты',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Ксения',
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function func(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильная почта или пароль!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(('Неправильная почта или пароль!')));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
